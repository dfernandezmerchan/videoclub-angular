import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./inicio/inicio').then((m) => m.Inicio);
        }
    },
    {
        path: 'favoritos',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./favoritos/favoritos').then((m) => m.Favoritos);
        }
    },
    {
        path: 'administrar',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./administrar/administrar').then((m) => m.Administrar);
        }
    },
];
