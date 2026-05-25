import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'bi bi-grid-1x2-fill',
      route: '/dashboard',
    },
    {
      label: 'Pedidos',
      icon: 'bi bi-receipt-cutoff',
      route: '/pedidos',
    },
    {
      label: 'Productos',
      icon: 'bi bi-box-seam',
      route: '/productos',
    },
    {
      label: 'Documentos',
      icon: 'bi bi-file-earmark-text',
      route: '/documentos',
    },
    {
      label: 'Reportes',
      icon: 'bi bi-bar-chart-line',
      route: '/reportes',
    },
  ];
}
