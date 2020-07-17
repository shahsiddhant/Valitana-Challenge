import { Component, OnInit } from '@angular/core';
import {
  Article,
  ArticleManagerService,
} from '../services/article-manager.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less'],
})
export class ArticleListComponent implements OnInit {
  public articleList: Article[] = [];
  constructor(private articleManagerService: ArticleManagerService) {}

  ngOnInit(): void {
    // const article: Partial<Article> = {
    //   title: 'This is the title',
    //   author: 'sid',
    //   body: 'This is body',
    // };
    // for (let i = 0; i < 5; i++) {
    //   this.articleManagerService.createNewArticle(article).subscribe((res) => {
    //     console.log(res);
    //   });
    // }
    this.articleManagerService.getAllArticles().subscribe((res: Article[]) => {
      this.articleList = res;
    });
  }
}
