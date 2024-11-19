import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  generalUrl = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // O sessionStorage.getItem('token')
    if (!token) {
      throw new Error('Token no disponible');
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }  

  getHttpAuth(route: string) {
    const url = this.generalUrl + route;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  postHttpAuth(route: string, body: any) {
    const url = this.generalUrl + route;
    return this.httpClient.post<any>(url, body, { headers: this.getHeaders() });
  }

  putHttpAuth(route: string, body: any) {
    const url = this.generalUrl + route;
    return this.httpClient.put<any>(url, body, { headers: this.getHeaders() });
  }

  deleteHttpAuth(route: string, body: any) {
    const url = this.generalUrl + route;
    return this.httpClient.delete<any>(url, { headers: this.getHeaders(), body });
  }

  getHttp(route: String){
    const url = this.generalUrl + route;
    return this.httpClient.get<any>(url);
  }

  postHttp(route: String, body: any){
    const url = this.generalUrl + route;
    return this.httpClient.post<any>(url, body);
  }

  putHttp(route: String, body: any){
    const url = this.generalUrl + route;
    return this.httpClient.put<any>(url, body);
  }

  deleteHttp(route: String, body: any){
    const url = this.generalUrl + route;
    return this.httpClient.delete<any>(url, body);
  }
}
