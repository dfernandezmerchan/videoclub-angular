import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula';

@Injectable({
  providedIn: 'root',
})
export class Peliculas {
    private apiUrl = 'https://devsapihub.com/api-movies';
    private peliculasSubject = new BehaviorSubject<Pelicula[]>([]);

    peliculas$: Observable<Pelicula[]> = this.peliculasSubject.asObservable();
    favoritos$: Observable<Pelicula[]> = this.peliculas$.pipe(
        map(peliculas => peliculas.filter(p => p.favorita))
    );

    constructor(private http: HttpClient) {
        this.cargarPeliculas();
    }

    private cargarPeliculas(): void {
        this.http.get<any[]>(this.apiUrl).pipe(
            map(peliculas => peliculas.map(p => ({ ...p, favorita: false })))
        ).subscribe(peliculas => this.peliculasSubject.next(peliculas));
    }

    toggleFavorito(id: number): void {
        const actualizadas = this.peliculasSubject.getValue().map(p =>
            p.id === id ? { ...p, favorita: !p.favorita } : p
        );
        this.peliculasSubject.next(actualizadas);
    }
}
