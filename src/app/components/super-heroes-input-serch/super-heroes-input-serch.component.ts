import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-super-heroes-input-serch',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './super-heroes-input-serch.component.html',
  styleUrl: './super-heroes-input-serch.component.css',
  standalone: true,
})
export class SuperHeroesInputSerch {
  searchValue = model<string>('');
}
