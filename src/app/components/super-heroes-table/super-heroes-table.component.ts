import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ISuperHero } from '../../interfaces/interfaces';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteHeroDialogComponent } from '../delete-hero/delete-hero-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SuperHeroesInputSearchAutocompleteComponent } from '../super-heroes-input-search-autocomplete/super-heroes-input-search-autocomplete.component';

@Component({
  selector: 'app-super-heroes-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    SuperHeroesInputSearchAutocompleteComponent,
  ],
  templateUrl: './super-heroes-table.component.html',
  styleUrl: './super-heroes-table.component.css',
  standalone: true,
})
export class SuperHeroesTable implements OnInit, AfterViewInit {
  private toast = inject(ToastrService);
  private superHeroesService = inject(SuperHeroesService);
  private router = inject(Router);
  columns: string[] = ['id', 'name', 'power', 'description', 'actions'];
  superHeroesData = new MatTableDataSource<ISuperHero>();
  dialog = inject(MatDialog);
  searchedValue = signal<string>('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  allSuperHeroes = signal<ISuperHero[]>([]);

  ngOnInit() {
    this.getSuperHeroes();
  }

  getSuperHeroes = () => {
    this.superHeroesData.data = this.superHeroesService.getSuperHeroes();
    this.allSuperHeroes.set(this.superHeroesService.getSuperHeroes());
  };

  ngAfterViewInit() {
    this.superHeroesData.paginator = this.paginator;
  }

  selectedHero = (selectedHero: string) => {
    if (selectedHero) {
      this.superHeroesData.data = this.superHeroesService.getSuperHeroesByName(selectedHero);
    } else {
      this.getSuperHeroes();
    }
  };

  goToAddSuperHero = () => {
    this.router.navigate(['/add-super-hero']);
  };

  goToEditSuperHero = (superHero: ISuperHero) => {
    this.router.navigate(['/edit-super-hero', superHero.id]);
  };

  openDeleteDialog(superHero: ISuperHero) {
    const dialogRef = this.dialog.open(DeleteHeroDialogComponent, {
      data: {
        superHeroName: superHero.name,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        try {
          this.superHeroesService.deleteSuperHero(superHero.id);
          this.toast.success('Super hero deleted successfully');
        } catch (error) {
          this.toast.error('Error at deleting super hero');
        }
        this.getSuperHeroes();
      }
    });
  }
}
