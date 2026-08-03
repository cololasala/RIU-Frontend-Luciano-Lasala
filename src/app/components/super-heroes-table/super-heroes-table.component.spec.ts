import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesTable } from './super-heroes-table.component';

describe('SuperHeroesTable', () => {
  let component: SuperHeroesTable;
  let fixture: ComponentFixture<SuperHeroesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesTable],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
