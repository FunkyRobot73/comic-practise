import { TestBed } from '@angular/core/testing';

import { ComicbookService } from './comicbook.service';

describe('ComicbookService', () => {
  let service: ComicbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
