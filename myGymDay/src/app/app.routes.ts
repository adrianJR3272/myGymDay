import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registrarEntrenamiento',
    loadComponent: () =>
      import('./home/shared/record-training/record-training.component').then(
        (m) => m.RecordTrainingComponent
      ),
  },
  {
    path: 'registros',
    loadComponent: () =>
      import('./home/shared/training-list/training-list.component').then(
        (m) => m.TrainingListComponent
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
