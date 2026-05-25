import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PedidosService} from '../../services/pedidos.service';
import {MessageService} from 'primeng/api';
import {PedidoInterface} from '../../interfaces/pedidos.interface';

@Component({
  selector: 'app-pedidos',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class PedidosComponent implements OnInit{

  pedidos: PedidoInterface[] = [];
  pedidosFiltrados: PedidoInterface[] = [];

  isLoading = false;
  searchTerm = '';
  estadoSeleccionado = 'Todos';

  estados: string[] = ['Todos'];

  constructor(
    private pedidosService: PedidosService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.isLoading = true;

    this.pedidosService.getPedidos().subscribe({
      next: (response) => {
        this.pedidos = response.data ?? [];
        this.pedidosFiltrados = [...this.pedidos];

        const estadosUnicos = Array.from(
          new Set(this.pedidos.map((pedido) => pedido.estado).filter(Boolean)),
        );

        this.estados = ['Todos', ...estadosUnicos];

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar pedidos',
          detail: 'No se pudo obtener la información desde el servidor.',
          life: 4500,
        });

        console.error('Error pedidos:', error);
      },
    });
  }

  filtrarPedidos(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.pedidosFiltrados = this.pedidos.filter((pedido) => {
      const coincideBusqueda =
        pedido.nombre_cliente?.toLowerCase().includes(term) ||
        pedido.apellido_cliente?.toLowerCase().includes(term) ||
        pedido.telefono_cliente?.toLowerCase().includes(term) ||
        pedido.producto?.toLowerCase().includes(term) ||
        pedido.direccion?.toLowerCase().includes(term);

      const coincideEstado =
        this.estadoSeleccionado === 'Todos' || pedido.estado === this.estadoSeleccionado;

      return coincideBusqueda && coincideEstado;
    });
  }

  limpiarFiltros(): void {
    this.searchTerm = '';
    this.estadoSeleccionado = 'Todos';
    this.pedidosFiltrados = [...this.pedidos];
  }

  get totalPedidos(): number {
    return this.pedidosFiltrados.length;
  }

  get totalUnidades(): number {
    return this.pedidosFiltrados.reduce((acc, pedido) => {
      return acc + Number(pedido.cantidad ?? 0);
    }, 0);
  }

  get totalVentas(): string {
    const total = this.pedidosFiltrados.reduce((acc, pedido) => {
      return acc + Number(pedido.total ?? 0);
    }, 0);

    return total.toFixed(2);
  }

  getBadgeEstado(estado: string): string {
    const normalized = estado?.toLowerCase() ?? '';

    if (normalized.includes('proceso')) return 'text-bg-warning';
    if (normalized.includes('entregado')) return 'text-bg-success';
    if (normalized.includes('cancelado')) return 'text-bg-danger';
    if (normalized.includes('pendiente')) return 'text-bg-info';

    return 'text-bg-secondary';
  }
}
