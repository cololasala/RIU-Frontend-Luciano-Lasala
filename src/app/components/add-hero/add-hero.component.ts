import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Router } from '@angular/router';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { ToastrService } from 'ngx-toastr';
import { HeroNameToUpperCase } from '../../directives/hero-name-to-upper-case.directive';
@Component({
  selector: 'app-add-hero',
  imports: [
    MatInput,
    MatFormField,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    HeroNameToUpperCase,
  ],
  templateUrl: './add-hero.component.html',
  styleUrl: './add-hero.component.css',
  standalone: true,
})
export class AddHeroComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private SuperHeroesService = inject(SuperHeroesService);
  private toast = inject(ToastrService);
  superHeroForm: FormGroup;

  constructor() {
    this.superHeroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      power: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    if (this.superHeroForm.valid) {
      try {
        const newSuperHero = {
          id: 0,
          name: this.name.value!,
          power: this.power.value!,
          description: this.description.value!,
        };
        this.SuperHeroesService.createSuperHero(newSuperHero);
        this.toast.success('Super hero created successfully');
        this.router.navigate(['/']);
      } catch (error) {
        this.toast.error('Error at creating super hero');
      }
    }
  }

  onCancel = () => {
    this.router.navigate(['/']);
  };

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
