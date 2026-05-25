export interface PedidoInterface {
  id: string;
  nombre_cliente: string;
  apellido_cliente: string;
  telefono_cliente: string;
  producto: string;
  cantidad: number;
  total: string;
  direccion: string;
  fecha_pedido: string;
  hora_pedido: string;
  fecha_registro: string;
  estado: string;
}

export interface PedidosResponse {
  count: number;
  data: PedidoInterface[];
}
