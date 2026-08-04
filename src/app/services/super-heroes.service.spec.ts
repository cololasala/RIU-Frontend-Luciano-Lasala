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

describe('Get all Super heroes', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should return all super heroes', () => {
    const superHeroes = service.getSuperHeroes();
    expect(superHeroes).toEqual([
      {
        id: 1,
        name: 'Superman',
        power: 'Super fuerza, volar, rayo laser',
        description: 'El hombre de acero',
      },
      {
        id: 2,
        name: 'Batman',
        power: 'No tiene',
        description: 'Es el caballero de la noche',
      },
      {
        id: 3,
        name: 'Wonder Woman',
        power: 'Fuerza, agilidad',
        description: 'Es de las guerreras amazonas',
      },
      {
        id: 4,
        name: 'IronMan',
        power: 'Fuerza, vuela, es inteligente',
        description: 'Es ingeniero',
      },
    ]);
  });
});

describe('Get one super hero by name', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should return a super hero by name', () => {
    const superHero = service.getSuperHeroesByName('Superman');
    expect(superHero).toEqual([
      {
        id: 1,
        name: 'Superman',
        power: 'Super fuerza, volar, rayo laser',
        description: 'El hombre de acero',
      },
    ]);
  });
});

describe('Get one super hero by name', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should return a super hero by name', () => {
    const superHero = service.getSuperHeroesByName('Superman');
    expect(superHero).toEqual([
      {
        id: 1,
        name: 'Superman',
        power: 'Super fuerza, volar, rayo laser',
        description: 'El hombre de acero',
      },
    ]);
  });
});

describe('Create a new super hero', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should create a new super hero', () => {
    const newSuperHero = {
      id: 5,
      name: 'Spider-Man',
      power: 'Fuerza, agilidad',
      description: 'Es un joven con poderes de araña',
    };
    service.createSuperHero(newSuperHero);
    const allSuperHeroes = service.getSuperHeroes();
    expect(allSuperHeroes).toEqual(expect.arrayContaining([expect.objectContaining(newSuperHero)]));
  });
});

describe('Update a super hero', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should update a super hero', () => {
    const updatedSuperHero = {
      id: 1,
      name: 'Superman SSS',
      power: 'Super fuerza, volar, rayo laser',
      description: 'El hombre de acero actualizado',
    };
    service.updateSuperHero(updatedSuperHero);
    const allSuperHeroes = service.getSuperHeroes();
    expect(allSuperHeroes).toEqual(expect.arrayContaining([expect.objectContaining(updatedSuperHero)]));
  });
});

describe('Delete a super hero', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should delete a super hero', () => {
    const superHeroId = 1;
    service.deleteSuperHero(superHeroId);
    const remainingSuperHeroesIds = service.getSuperHeroes().map((superHero) => superHero.id);
    expect(remainingSuperHeroesIds).not.toContain(superHeroId);
  });
});
