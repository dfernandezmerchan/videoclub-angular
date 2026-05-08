import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula';

@Injectable({
  providedIn: 'root',
})
export class Peliculas {
    private apiUrl = 'https://devsapihub.com/api-movies';

    constructor(private http: HttpClient) {}

    getPeliculas(): Observable<Pelicula[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(map((peliculas) => 
            peliculas.map(pelicula => ({
                ...pelicula,
                favorita: false
            }))
        ));
    }
}
