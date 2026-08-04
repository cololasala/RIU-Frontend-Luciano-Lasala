import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroeService } from '../../services/super-heroe.service';
import { ISuperHero } from '../../interfaces/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-hero',
  imports: [
    MatInput,
    MatFormField,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
  ],
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.css',
  standalone: true,
})
export class EditHeroComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private superHeroeService = inject(SuperHeroeService);
  private toast = inject(ToastrService);
  superHeroForm: FormGroup;

  superHeroToEdit = signal<ISuperHero | undefined>(undefined);

  constructor() {
    this.superHeroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      power: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    });
  }

  ngOnInit() {
    this.getSuperHeroeById();
    this.initForm();
  }

  getSuperHeroeById() {
    const superHeroeId = Number(this.route.snapshot.paramMap.get('id'));
    const superHeroe = this.superHeroeService.getSuperHeroeById(superHeroeId);
    this.superHeroToEdit.set(superHeroe);
  }

  initForm() {
    this.superHeroForm.setValue({
      name: this.superHeroToEdit()?.name || '',
      power: this.superHeroToEdit()?.power || '',
      description: this.superHeroToEdit()?.description || '',
    });
  }

  onSubmit() {
    if (this.superHeroForm.valid) {
      if (this.validateSameValues()) {
        this.toast.info('No changes were made to the super hero');
        return;
      }
      try {
        const editSuperHero = {
          id: this.superHeroToEdit()?.id!,
          name: this.name.value!,
          power: this.power.value!,
          description: this.description.value!,
        };
        this.superHeroeService.updateSuperHero(editSuperHero);
        this.toast.success('Super hero updated successfully');
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error editing super hero', error);
      }
    }
  }

  onCancel = () => {
    this.router.navigate(['/']);
  };

  validateSameValues(): boolean {
    return (
      this.name.value === this.superHeroToEdit()?.name &&
      this.power.value === this.superHeroToEdit()?.power &&
      this.description.value === this.superHeroToEdit()?.description
    );
  }

  //Getters
  get name(): AbstractControl {
    return this.superHeroForm.get('name')!;
  }

  get power(): AbstractControl {
    return this.superHeroForm.get('power')!;
  }

  get description(): AbstractControl {
    return this.superHeroForm.get('description')!;
  }
}
