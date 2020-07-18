import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Article,
  ArticleManagerService,
} from '../services/article-manager.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less'],
})
export class ArticleDetailComponent implements OnInit {
  // TODO switch to enum - edit / create / view
  @Input() inEditMode = false;
  public currentArticle: Article;
  // no type from library
  public editorInstance: any;
  public bodyFormControl: FormControl;

  constructor(
    private route: ActivatedRoute,
    private articleManagerService: ArticleManagerService
  ) {}

  ngOnInit(): void {
    this.articleManagerService
      .getArticleById(+this.route.snapshot.params.id)
      .subscribe((res: Article) => {
        this.currentArticle = res;
        // this.bodyFormControl = new FormControl(this.currentArticle.body);
      });
  }

  editorCreated(editor) {
    this.editorInstance = editor;
    const contents = this.editorInstance.clipboard.convert(
      this.currentArticle.body
    );
    this.editorInstance.setContents(contents);
  }

  toggleEditMode() {
    this.inEditMode = true;
  }
  saveEverything() {
    this.inEditMode = false;
  }
}
