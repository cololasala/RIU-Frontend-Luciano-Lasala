import { Component, inject, OnInit, signal } from '@angular/core';
import { ISuperHeroe } from './interfaces/interfaces';
import { SuperHeroeService } from './services/super-heroe.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  superHeroeService = inject(SuperHeroeService)
  superHeroes = signal<ISuperHeroe[]>([]);

   ngOnInit(): void {
    this.getSuperHeroes();
   }

  getSuperHeroes = () => {
    this.superHeroeService.getSuperHeroes().subscribe({
      next: (data) => {
        this.superHeroes.set(data.superHeroes);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
