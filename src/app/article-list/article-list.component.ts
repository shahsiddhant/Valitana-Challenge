import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  public searchBar: FormControl;
  private originalArticleList: Article[] = [];

  constructor(private articleManagerService: ArticleManagerService) {}

  ngOnInit(): void {
    this.articleManagerService.getAllArticles().subscribe((res: Article[]) => {
      this.originalArticleList = res;
      this.articleList = this.originalArticleList;
    });
    this.searchBar = new FormControl();
    this.searchBar.valueChanges.subscribe((value) => {
      this.searchItem(value);
    });
  }

  searchItem(searchTerm: string) {
    if (searchTerm) {
      this.articleList = this.originalArticleList.filter((article) => {
        return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      this.articleList = this.originalArticleList;
    }
  }
}
