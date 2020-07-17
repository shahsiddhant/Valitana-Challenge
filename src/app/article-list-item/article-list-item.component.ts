import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../services/article-manager.service';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.less'],
})
export class ArticleListItemComponent implements OnInit {
  @Input() article: Article;
  constructor() {}

  ngOnInit(): void {
    console.log(this.article);
  }
}
