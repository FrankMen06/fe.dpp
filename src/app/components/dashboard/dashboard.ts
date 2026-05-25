import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MessageService } from 'primeng/api';
import { HighchartsChartComponent } from 'highcharts-angular';
import type { Options } from 'highcharts';

import {
  pedidosMesInterface,
  productosMasVendidosInterface,
} from '../../interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  imports: [HighchartsChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  isLoading = false;
  errorMessage = '';

  selectedTab: 'pedidos-mes' | 'productos' | 'detalle' = 'pedidos-mes';

  pedidosPorMes: pedidosMesInterface[] = [];
  productosMasVendidos: productosMasVendidosInterface[] = [];

  totalPedidos = 0;
  totalUnidades = 0;
  totalVentas = '0.00';
  totalProductos = 0;

  pedidosPorMesOptions: Options = {};
  productosMasVendidosOptions: Options = {};

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService.getInfoChart().subscribe({
      next: (data) => {
        this.pedidosPorMes = data.pedidosPorMes ?? [];
        this.productosMasVendidos = data.productosMasVendidos ?? [];

        this.calculateTotals();
        this.buildPedidosPorMesChart();
        this.buildProductosMasVendidosChart();

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'No se pudo cargar la información del dashboard.';

        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar datos',
          detail: 'No se pudo conectar con el servidor o el endpoint falló.',
          life: 4500,
        });

        console.error('Error dashboard:', error);
      },
    });
  }

  private calculateTotals(): void {
    this.totalPedidos = this.pedidosPorMes.reduce((acc, item) => {
      return acc + Number(item.total_pedidos ?? 0);
    }, 0);

    this.totalUnidades = this.productosMasVendidos.reduce((acc, item) => {
      return acc + Number(item.total_unidades ?? 0);
    }, 0);

    const ventas = this.productosMasVendidos.reduce((acc, item) => {
      return acc + Number(item.total_ventas ?? 0);
    }, 0);

    this.totalVentas = ventas.toFixed(2);
    this.totalProductos = this.productosMasVendidos.length;
  }

  private buildPedidosPorMesChart(): void {
    const categories = this.pedidosPorMes.map((item) => item.mes);

    this.pedidosPorMesOptions = {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Pedidos por mes',
      },
      xAxis: {
        categories,
      },
      yAxis: {
        title: {
          text: 'Cantidad de pedidos',
        },
        allowDecimals: false,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: 'column',
          name: 'Pedidos',
          data: this.pedidosPorMes.map((item) => Number(item.total_pedidos ?? 0)),
        },
      ],
    };
  }

  private buildProductosMasVendidosChart(): void {
    const categories = this.productosMasVendidos.map((item) => item.producto);

    this.productosMasVendidosOptions = {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'Productos más vendidos',
      },
      xAxis: {
        categories,
      },
      yAxis: {
        title: {
          text: 'Unidades vendidas',
        },
        allowDecimals: false,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        valueSuffix: ' unidades',
      },
      series: [
        {
          type: 'bar',
          name: 'Unidades',
          data: this.productosMasVendidos.map((item) => Number(item.total_unidades ?? 0)),
        },
      ],
    };
  }
}
