import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { dbConfig } from './db-config';
@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleListItemComponent,
    ArticleDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    QuillModule.forRoot({
      theme: 'bubble',
      placeholder: 'Start here...',
      modules: {
        toolbar: [['bold', 'italic'], ['link']],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
