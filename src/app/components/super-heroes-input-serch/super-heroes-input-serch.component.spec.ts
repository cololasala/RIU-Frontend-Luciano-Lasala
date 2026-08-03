import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesInputSerch } from './super-heroes-input-serch.component';

describe('SuperHeroesInputSerch', () => {
  let component: SuperHeroesInputSerch;
  let fixture: ComponentFixture<SuperHeroesInputSerch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesInputSerch],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesInputSerch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
