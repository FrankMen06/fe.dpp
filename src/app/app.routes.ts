import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import {PedidosComponent} from './components/pedidos/pedidos';
import {ProductosComponent} from './components/productos/productos';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
