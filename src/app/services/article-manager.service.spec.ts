import { TestBed } from '@angular/core/testing';

import { ArticleManagerService } from './article-manager.service';

describe('ArticleManagerService', () => {
  let service: ArticleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
