import { TestBed } from '@angular/core/testing';

import { CreateBlogService } from './create-blog.service';

describe('CreateBlogService', () => {
  let service: CreateBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
