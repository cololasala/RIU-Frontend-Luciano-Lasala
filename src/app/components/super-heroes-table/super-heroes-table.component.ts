import { AfterViewInit, Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { SuperHeroesInputSerch } from '../super-heroes-input-serch/super-heroes-input-serch.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ISuperHero } from '../../interfaces/interfaces';
import { SuperHeroeService } from '../../services/super-heroe.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteHeroDialogComponent } from '../delete-hero/delete-hero-dialog.component';

@Component({
  selector: 'app-super-heroes-table',
  imports: [SuperHeroesInputSerch, MatTableModule, MatPaginatorModule, MatButton],
  templateUrl: './super-heroes-table.component.html',
  styleUrl: './super-heroes-table.component.css',
  standalone: true,
})
export class SuperHeroesTable implements OnInit, AfterViewInit {
  columns: string[] = ['id', 'name', 'power', 'description', 'actions'];
  superHeroesData = new MatTableDataSource<ISuperHero>();
  dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private superHeroeService = inject(SuperHeroeService);
  private router = inject(Router);

  searchedValue = signal<string>('');

  ngOnInit() {
    this.getSuperHeroes();
  }

  getSuperHeroes = () => {
    this.superHeroesData.data = this.superHeroeService.getSuperHeroes();
  };

  ngAfterViewInit() {
    this.superHeroesData.paginator = this.paginator;
  }

  onSearched = effect(() => {
    if (this.searchedValue()) {
      this.superHeroesData.data = this.superHeroeService.getSuperHeroeByName(this.searchedValue());
    } else {
      this.getSuperHeroes();
    }
  });

  goToAddSuperHero = () => {
    this.router.navigate(['/add-super-heroe']);
  };

  openDeleteDialog(superHero: ISuperHero) {
    const dialogRef = this.dialog.open(DeleteHeroDialogComponent, {
      data: {
        superHeroName: superHero.name,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.superHeroeService.deleteSuperHeroe(superHero.id);
        this.getSuperHeroes();
      }
    });
  }
}
