import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesInputSearchAutocompleteComponent } from './super-heroes-input-search-autocomplete.component';

describe('SuperHeroesInputSearchAutocompleteComponent', () => {
  let component: SuperHeroesInputSearchAutocompleteComponent;
  let fixture: ComponentFixture<SuperHeroesInputSearchAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesInputSearchAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesInputSearchAutocompleteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
