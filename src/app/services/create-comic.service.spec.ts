import { TestBed } from '@angular/core/testing';

import { CreateComicService } from './create-comic.service';

describe('CreateComicService', () => {
  let service: CreateComicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateComicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
