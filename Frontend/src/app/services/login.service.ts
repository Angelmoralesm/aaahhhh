import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {

   }
  
  ValidarLogin(nombre:string,password:string):Observable<any>{

    const params = new HttpParams();
    params.set("usuario",nombre);
    params.set("clave", password);
    return this.http.get(`${environment.hostname}:${environment.port}/api/login/${nombre}/${password}`);
  }

  Token():Observable<any>{
    return this.http.get(`${environment.hostname}":"${environment.port}/token`);
  }

}
