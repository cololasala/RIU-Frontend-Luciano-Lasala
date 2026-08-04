import { TestBed } from '@angular/core/testing';

import { SuperHeroesService } from './super-heroes.service';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('SuperHeroesService get all Super heroes', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('SuperHeroesService one super hero by name', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should return a super hero by name', () => {
    const superHero = service.getSuperHeroesByName('Superman');
    expect(superHero).toEqual([{
      id: 1,
      name: 'Superman',
      power: 'Super fuerza, volar, rayo laser',
      description: 'El hombre de acero',
    }]);
  });
});
