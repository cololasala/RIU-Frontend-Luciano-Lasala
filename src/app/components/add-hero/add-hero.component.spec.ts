import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroComponent } from './add-hero.component';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { vi } from 'vitest';
import { ISuperHero } from '../../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SuperHeroesService } from '../../services/super-heroes.service';

describe('AddHeroComponent', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;
  let superHeroesService: any;
  let toast: any;
  let router: any;

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
    superHeroesService = { createSuperHero: (hero: ISuperHero) => ({ ...hero, id: 3 }) };

    toast = {
      success: () => {},
      error: () => {},
    };

    router = {
      navigate: vi.fn(),
    };

    toast = {
      success: () => {},
      error: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [AddHeroComponent],
      providers: [
        provideToastr(),
        {
          provide: SuperHeroesService,
          useValue: superHeroesService,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ToastrService,
          useValue: toast,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form when onSubmit is called', () => {
    vi.spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should initialize the form with empty values', () => {
    expect(component.superHeroForm.value).toEqual({
      name: '',
      power: '',
      description: '',
    });
  });

  it('should create a superhero and navigate when the form is valid', () => {
    component.superHeroForm.setValue({
      name: 'Wonder Woman',
      power: 'habilidad',
      description: 'Es de la amazonas',
    });

    const createSuperHero = vi.spyOn(superHeroesService, 'createSuperHero');
    const toastSuccess = vi.spyOn(toast, 'success');
    const navigateTo = vi.spyOn(router, 'navigate');

    component.onSubmit();

    expect(createSuperHero).toHaveBeenCalledWith({
      id: 0,
      name: 'Wonder Woman',
      power: 'habilidad',
      description: 'Es de la amazonas',
    });

    expect(toastSuccess).toHaveBeenCalledWith('Super hero created successfully');
    expect(navigateTo).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to home when onCancel is called', () => {
    const navigateTo = vi.spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateTo).toHaveBeenCalledWith(['/']);
  });
});
