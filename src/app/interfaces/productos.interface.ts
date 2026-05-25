export interface ProductoInterface {
  id: string;
  documento_id: string;
  producto: string;
  categoria: string;
  ingredientes: string;
  origen: string;
  precio: number;
  palabras_clave: string;
}

export interface ProductosResponse {
  count: number;
  data: ProductoInterface[];
}
