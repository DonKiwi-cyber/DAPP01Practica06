import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl = ''
  username = ''
  password = ''

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/dapp05/empleado'
    this.username = 'ian'
    this.password = '123'
  }

  getAuthHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Authorization': 'Basic '+ btoa(`${this.username}:${this.password}`),
      'Content-Type': 'application/json'
    })
  }

  getAll(): Observable<any>{
    console.log('obteniendo todos los datos')
    const headers = this.getAuthHeaders()
    let response = this.http.get(this.baseUrl, { headers })
    return response
  }

  getOne(id: number): Observable<any>{
    console.log('obteniendo un dato')
    const headers = this.getAuthHeaders()
    let response = this.http.get(`${this.baseUrl}/${id}`, { headers })
    return response
  }

  post(data: any): Observable<any>{
    console.log('enviando un dato')
    const headers = this.getAuthHeaders()
    let response = this.http.post(this.baseUrl, data, { headers })
    return response
  }

  put(data: any, id: number): Observable<any>{
    console.log('actualizando un dato')
    const headers = this.getAuthHeaders()
    let response = this.http.put(`${this.baseUrl}/${id}`, data, { headers })
    return response
  }

  delete(id: number): Observable<any>{
    console.log('eliminando un dato')
    const headers = this.getAuthHeaders()
    let response = this.http.delete(`${this.baseUrl}/${id}`, { headers })
    return response
  }
}
