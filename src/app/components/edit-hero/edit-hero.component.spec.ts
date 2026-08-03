import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroComponent } from './edit-hero.component';

describe('EditHeroComponent', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
