import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Article,
  ArticleManagerService,
  ArticleMode,
} from '../services/article-manager.service';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.less'],
})
export class ArticleListItemComponent implements OnInit {
  @Input() article: Article;
  public confirmDelete = false;
  constructor(
    private rotuer: Router,
    private articleManagerService: ArticleManagerService
  ) {}

  ngOnInit(): void {}

  editArticle(e: Event) {
    e.stopPropagation();
    // edit mode
    this.rotuer.navigate(['article', this.article.id], {
      queryParams: { mode: ArticleMode.EDIT },
    });
  }
  deleteArticle(e: Event) {
    e.stopPropagation();
    // confirm and delete
    this.confirmDelete = true;
  }
  cancelDelete(e: Event) {
    e.stopPropagation();
    this.confirmDelete = false;
  }

  deleteForSure(e: Event) {
    e.stopPropagation();
    this.articleManagerService.deleteArticle(this.article.id).subscribe();
  }
}
