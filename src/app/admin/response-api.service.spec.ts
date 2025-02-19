import { TestBed } from '@angular/core/testing';

import { ResponseApiService } from './response-api.service';

describe('ResponseApiService', () => {
  let service: ResponseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
