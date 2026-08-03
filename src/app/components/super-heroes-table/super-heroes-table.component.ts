import { AfterViewInit, Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { SuperHeroesInputSerch } from '../super-heroes-input-serch/super-heroes-input-serch.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ISuperHeroe } from '../../interfaces/interfaces';
import { SuperHeroeService } from '../../services/super-heroe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-heroes-table',
  imports: [SuperHeroesInputSerch, MatTableModule, MatPaginatorModule],
  templateUrl: './super-heroes-table.component.html',
  styleUrl: './super-heroes-table.component.css',
  standalone: true,
})
export class SuperHeroesTable implements OnInit, AfterViewInit {
  columns: string[] = ['id', 'name', 'power', 'description', 'actions'];
  superHeroesData = new MatTableDataSource<ISuperHeroe>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  superHeroeService = inject(SuperHeroeService);
  router = inject(Router);

  searchedValue = signal('');

  ngOnInit() {
    this.getSuperHeroes();
  }

  getSuperHeroes = () => {
    this.superHeroesData.data = this.superHeroeService.getSuperHeroes();
  };

  ngAfterViewInit() {
    this.superHeroesData.paginator = this.paginator;
  }

  goToAddSuperHero = () => {
    // this.router.navigate(["/add-super-heroe"])
  };

  onSearched = effect(() => {
    if (this.searchedValue()) {
      this.superHeroesData.data = this.superHeroeService.getSuperHeroeByName(this.searchedValue());
    } else {
      this.getSuperHeroes();
    }
  });
}
