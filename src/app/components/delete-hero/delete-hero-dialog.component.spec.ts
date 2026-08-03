import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteHeroDialogComponent } from './delete-hero-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteHeroDialogComponent;
  let fixture: ComponentFixture<DeleteHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHeroDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteHeroDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
