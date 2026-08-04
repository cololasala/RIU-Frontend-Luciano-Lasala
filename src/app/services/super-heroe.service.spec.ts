import { TestBed } from '@angular/core/testing';

import { SuperHeroeService } from './super-heroe.service';

describe('SuperHeroeService', () => {
  let service: SuperHeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('SuperHeroeService get all Super heroes', () => {
  let service: SuperHeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('SuperHeroeService one super hero by name', () => {
  let service: SuperHeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
