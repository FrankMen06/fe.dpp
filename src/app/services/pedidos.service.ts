import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {endpoint} from "../../environments/endpoint";
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<any> {
    const url = endpoint.campomesa.pedidos;
    return this.http.get(url);
  }

}
