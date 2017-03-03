import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './conta/conta.component';
import { ContaDetailComponent } from './conta-detail/conta-detail.component';

const APP_ROUTES: Routes = [
  { path: 'contas', component: ContaComponent },
  { path: 'contas/:id', component: ContaDetailComponent },
  { path: '**', component: ContaComponent }
];

export const routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
