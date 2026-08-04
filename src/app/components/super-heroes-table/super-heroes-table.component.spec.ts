import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperHeroesTable } from './super-heroes-table.component';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { of } from 'rxjs';
import { ISuperHero } from '../../interfaces/interfaces';

describe('SuperHeroesTable', () => {
  let component: SuperHeroesTable;
  let fixture: ComponentFixture<SuperHeroesTable>;

  let superHeroesServiceMock: any;
  let routerMock: any;
  let dialogMock: any;
  let toastrMock: any;

  const heroes: ISuperHero[] = [
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
  ];

  beforeEach(async () => {
    superHeroesServiceMock = {
      getSuperHeroes: () => heroes,

      getSuperHeroesByName: (name: string) => heroes.filter((hero) => hero.name === name),

      deleteSuperHero: () => {},
    };

    routerMock = {
      navigate: () => {},
    };

    dialogMock = {
      open: () => ({
        afterClosed: () => of('confirmed'),
      }),
    };

    toastrMock = {
      success: () => {},
      error: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [SuperHeroesTable],
      providers: [
        provideToastr(),
        {
          provide: SuperHeroesService,
          useValue: superHeroesServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: MatDialog,
          useValue: dialogMock,
        },
        {
          provide: ToastrService,
          useValue: toastrMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesTable);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  describe('Creation component', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Get super heroes', () => {
    it('should get super heroees', () => {
      component.ngOnInit();

      expect(component.superHeroesData.data).toEqual(heroes);

      expect(component.allSuperHeroes()).toEqual(heroes);
    });
  });

  describe('Search super heroes', () => {
    it('should filter super heroes by name', () => {
      component.selectedHero('Superman');

      expect(component.superHeroesData.data).toEqual([
        {
          id: 1,
          name: 'Superman',
          power: 'Super fuerza, volar, rayo laser',
          description: 'El hombre de acero',
        },
      ]);
    });

    it('should show all super heroes when search is empty', () => {
      component.selectedHero('');

      expect(component.superHeroesData.data).toEqual(heroes);
    });
  });

  describe('Navigation', () => {
    it('should navigate to add superhero', () => {
      let path: string[] = [];

      routerMock.navigate = (route: string[]) => {
        path = route;
      };

      component.goToAddSuperHero();

      expect(path).toEqual(['/add-super-hero']);
    });

    it('should navigate to edit super hero', () => {
      let path: any[] = [];

      routerMock.navigate = (route: any[]) => {
        path = route;
      };

      component.goToEditSuperHero(heroes[0]);

      expect(path).toEqual(['/edit-super-hero', 1]);
    });
  });

  describe('Delete super hero', () => {
    it('should open dialog and delete super hero', () => {
      let deletedId = 0;
      let message = '';

      superHeroesServiceMock.deleteSuperHero = (id: number) => {
        deletedId = id;
      };

      toastrMock.success = (text: string) => {
        message = text;
      };

      component.openDeleteDialog(heroes[0]);

      expect(deletedId).toBe(1);

      expect(message).toBe('Super hero deleted successfully');
    });
  });
});
