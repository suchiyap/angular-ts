import { TestBed } from '@angular/core/testing';

import { SiderService } from './sider.service';

describe('SiderService', () => {
  let service: SiderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
