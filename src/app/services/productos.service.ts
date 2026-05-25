import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {endpoint} from "../../environments/endpoint";
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    const url = endpoint.campomesa.productos;
    return this.http.get(url);
  }

}
