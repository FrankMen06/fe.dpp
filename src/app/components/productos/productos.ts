import {Component, OnInit} from '@angular/core';
import {ProductoInterface} from '../../interfaces/productos.interface';
import {ProductosService} from '../../services/productos.service';
import {MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [
    FormsModule
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosComponent  implements OnInit{

  productos: ProductoInterface[] = [];
  productosFiltrados: ProductoInterface[] = [];

  isLoading = false;
  searchTerm = '';
  categoriaSeleccionada = 'Todas';

  categorias: string[] = ['Todas'];

  constructor(
    private productosService: ProductosService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.isLoading = true;

    this.productosService.getProductos().subscribe({
      next: (response) => {
        this.productos = response.data ?? [];
        this.productosFiltrados = [...this.productos];

        const categoriasUnicas = Array.from(
          new Set(this.productos.map((producto) => producto.categoria).filter(Boolean)),
        );

        this.categorias = ['Todas', ...categoriasUnicas];

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar productos',
          detail: 'No se pudo obtener la información desde el servidor.',
          life: 4500,
        });

        console.error('Error productos:', error);
      },
    });
  }

  filtrarProductos(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.productosFiltrados = this.productos.filter((producto) => {
      const coincideBusqueda =
        producto.producto?.toLowerCase().includes(term) ||
        producto.categoria?.toLowerCase().includes(term) ||
        producto.origen?.toLowerCase().includes(term) ||
        producto.ingredientes?.toLowerCase().includes(term) ||
        producto.palabras_clave?.toLowerCase().includes(term);

      const coincideCategoria =
        this.categoriaSeleccionada === 'Todas' ||
        producto.categoria === this.categoriaSeleccionada;

      return coincideBusqueda && coincideCategoria;
    });
  }

  limpiarFiltros(): void {
    this.searchTerm = '';
    this.categoriaSeleccionada = 'Todas';
    this.productosFiltrados = [...this.productos];
  }

  get totalProductos(): number {
    return this.productosFiltrados.length;
  }

  get precioPromedio(): string {
    const precios = this.productosFiltrados
      .map((producto) => Number(producto.precio ?? 0))
      .filter((precio) => precio > 0);

    if (precios.length === 0) return '0.00';

    const promedio = precios.reduce((acc, precio) => acc + precio, 0) / precios.length;

    return promedio.toFixed(2);
  }
}
