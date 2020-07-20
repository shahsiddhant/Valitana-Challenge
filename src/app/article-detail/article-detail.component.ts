import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Article,
  ArticleManagerService,
  ArticleMode,
} from '../services/article-manager.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less'],
})
export class ArticleDetailComponent implements OnInit {
  public mode: ArticleMode;
  public ArticleMode = ArticleMode;
  public currentArticle: Article;
  // no type from library
  public editorInstance: any;
  public body: FormControl;
  public title: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleManagerService: ArticleManagerService
  ) {}

  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParams.mode;
    if (this.route.snapshot.params.id) {
      this.articleManagerService
        .getArticleById(+this.route.snapshot.params.id)
        .subscribe((res: Article) => {
          this.currentArticle = res;
          this.body.setValue(this.currentArticle.body);
          this.title.setValue(this.currentArticle.title);
        });
    }

    this.body = new FormControl('');
    this.title = new FormControl('', [Validators.required]);
  }

  editorCreated(editor: any) {
    this.editorInstance = editor;
    if (this.currentArticle) {
      const contents = this.editorInstance.clipboard.convert(
        this.currentArticle.body
      );
      this.editorInstance.setContents(contents);
    }
  }

  editorContentChanged(value: any) {
    this.body.setValue(value.html, { emitEvent: false });
  }

  toggleEditMode() {
    this.mode = ArticleMode.EDIT;
  }

  saveEverything() {
    const articleToSave: Partial<Article> = {};

    if (!this.title.value) {
      this.title.markAsDirty();
      return;
    } else {
      articleToSave.title = this.title.value;
      articleToSave.body = this.body.value;
    }

    if (this.currentArticle) {
      this.currentArticle.title = articleToSave.title;
      this.currentArticle.body = articleToSave.body;
      this.articleManagerService
        .updateArticle(this.currentArticle)
        .subscribe(() => {
          this.mode = ArticleMode.VIEW;
        });
    } else {
      this.articleManagerService
        .createNewArticle(articleToSave)
        .subscribe((articleId: number) => {
          this.router.navigate(['article', articleId], {
            queryParams: { mode: ArticleMode.VIEW },
          });
        });
    }
  }

  cancelEdit() {
    this.mode = ArticleMode.VIEW;
    this.body.setValue(this.currentArticle.body);
    this.title.setValue(this.currentArticle.title);
    const contents = this.editorInstance.clipboard.convert(
      this.currentArticle.body
    );
    this.editorInstance.setContents(contents);
  }
}
