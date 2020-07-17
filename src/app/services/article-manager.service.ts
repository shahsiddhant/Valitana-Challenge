import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { from, Observable } from 'rxjs';

export interface Article {
  id?: number;
  title: string;
  author: string;
  publishedOn: Date;
  lastUpdated: Date;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleManagerService {
  constructor(private dbService: NgxIndexedDBService) {}

  getAllArticles(): Observable<Article[]> {
    return from(this.dbService.getAll<Article>('articles'));
  }

  getArticleById(id: number): Observable<Article> {
    return from(this.dbService.getByKey<Article>('articles', id));
  }

  // add return types
  createNewArticle(newArticle: Partial<Article>) {
    const modifiedArticle: Article = {
      publishedOn: new Date(),
      lastUpdated: new Date(),
      ...newArticle,
    } as Article;
    return from(this.dbService.add<Article>('articles', modifiedArticle));
  }

  updateArticle(article: Article) {
    article = {
      ...article,
      lastUpdated: new Date(),
    };
    return from(this.dbService.update<Article>('articles', article));
  }

  deleteArticle(id: number) {
    return from(this.dbService.delete('articles', id));
  }
}
