import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  generalUrl = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}

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
