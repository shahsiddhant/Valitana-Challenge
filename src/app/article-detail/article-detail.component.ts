import { Component, OnInit } from '@angular/core';
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
  public currentArticle: Article;
  constructor(
    private route: ActivatedRoute,
    private articleManagerService: ArticleManagerService
  ) {}

  ngOnInit(): void {
    this.articleManagerService
      .getArticleById(+this.route.snapshot.params.id)
      .subscribe((res: Article) => {
        this.currentArticle = res;
      });
  }
}
