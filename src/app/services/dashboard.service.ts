import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {endpoint} from "../../environments/endpoint";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getInfoChart(): Observable<any> {
    const url = endpoint.campomesa.dashboard + "/charts";
    return this.http.get(url);
  }

}
