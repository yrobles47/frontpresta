import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getOperacionesByDocument(busqueda:any) {
    return this.http.post(`${this.baseUrl}/antiguo/operaciones/documento`, busqueda);
  }
}
