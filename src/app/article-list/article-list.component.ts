import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortableOptions } from 'sortablejs';
import {
  Article,
  ArticleManagerService,
} from '../services/article-manager.service';

interface ArticleMap {
  article: Article;
  children: ArticleMap[];
}

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less'],
})
export class ArticleListComponent implements OnInit {
  public articleList: Article[] = [];
  public searchBar: FormControl;
  public sortableOptionsRoot: SortableOptions = {
    group: 'nested',
    fallbackOnBody: true,
    swapThreshold: 0.65,
    disabled: false,
    draggable: '.draggable',
    onAdd: (evt) => {
      console.log(evt);
      console.log(this.articleMap);
    },
  };
  // public sortableOptionsChild: SortableOptions = {
  //   group: 'nested',
  //   fallbackOnBody: true,
  //   swapThreshold: 0.2,
  //   disabled: false,
  //   draggable: '.draggable',

  //   onAdd: (evt) => {
  //     console.log(evt);
  //     console.log(this.articleMap);
  //   },
  // };
  public articleMap: ArticleMap[] = [];
  private originalArticleList: Article[] = [];

  constructor(private articleManagerService: ArticleManagerService) {}

  ngOnInit(): void {
    // TODO remove
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
      this.originalArticleList = res;
      this.articleList = this.originalArticleList;
      this.articleMap = this.originalArticleList.map((article) => {
        return {
          article,
          children: [],
        };
      });
      console.log(this.articleMap);
    });
    this.searchBar = new FormControl();
    this.searchBar.valueChanges.subscribe((value) => {
      // handle search value
      this.searchItem(value);
    });
  }
  searchItem(searchTerm: string) {
    if (searchTerm) {
      console.log(searchTerm);

      this.articleList = this.originalArticleList.filter((article) => {
        return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      this.articleList = this.originalArticleList;
    }
  }
}
