import { TestBed } from '@angular/core/testing';

import { ViewBlogService } from './view-blog.service';

describe('ViewBlogService', () => {
  let service: ViewBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
