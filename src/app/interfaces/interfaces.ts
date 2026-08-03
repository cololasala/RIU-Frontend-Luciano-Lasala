export interface ISuperHeroeResponse {
  superHeroes: ISuperHeroe[];
}

export interface ISuperHeroe {
  id: number;
  name: string;
  power: string;
  description: string;
}
