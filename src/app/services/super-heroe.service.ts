import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISuperHeroe, ISuperHeroeResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroeService {
  http = inject(HttpClient);

  getSuperHeroes(): Observable<ISuperHeroeResponse> {
    return this.http.get<ISuperHeroeResponse>('data/super-heroes.json');
  }

  getSuperHeroeById(superHeroeId: number): Observable<any> {
    return this.getSuperHeroes().pipe(
      map((data) => data.superHeroes.find((data) => data.id === superHeroeId)),
    );
  }

  getSuperHeroeByName(superHeroeName: string): Observable<any> {
    return this.getSuperHeroes().pipe(
      map((data) => data.superHeroes.filter((data) => data.name.includes(superHeroeName))),
    );
  }
}
