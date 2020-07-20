import { Component, Input } from '@angular/core';
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
export class ArticleListItemComponent {
  @Input() public article: Article;
  public confirmDelete = false;
  constructor(
    private router: Router,
    private articleManagerService: ArticleManagerService
  ) {}

  editArticle() {
    this.router.navigate(['article', this.article.id], {
      queryParams: { mode: ArticleMode.EDIT },
    });
  }

  confirmDeleteArticle() {
    this.confirmDelete = true;
  }

  cancelDelete() {
    this.confirmDelete = false;
  }

  deleteForSure() {
    this.articleManagerService.deleteArticle(this.article.id).subscribe(() => {
      // can acheive better data reload handling with rx but not enough time to set up.
      window.location.reload();
    });
  }
}
