import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(private http:HttpClient) {
  }

  RandomExercise(diff:string,area:string):Observable<any>{
    const params = new HttpParams();
    params.set("diff",diff);
    params.set("area",area);
    return this.http.get(`${environment.hostname}:${environment.port}/api/RandomExercise/${diff}/${area}`);
  }
  EncontrarEjercicio(id_:number):Observable<any>{
    const params = new HttpParams();
    params.set("id",id_);
    return this.http.get(`${environment.hostname}:${environment.port}/api/RandomExercise/${id_}`);

  }

  InsertExercise(diff:string,area:string,name:string,id:number,demopath:string,desc:string,duration:string,workarea:string):Observable<any>{
    const params = new HttpParams();
    params.set("diff",diff);
    params.set("area",area);
    params.set("name",name);
    params.set("id",id);
    params.set("demopath",demopath);
    params.set("desc",desc);
    params.set("duration",duration);
    params.set("workarea",workarea);
    //return this.http.post(`${environment.hostname}:${environment.port}/api/RandomExercise/${id}`,{});
    return this.http.post(`${environment.hostname}:${environment.port}/api/RandomExercise/${diff}/${area}/${name}/${id}/${demopath}/${desc}/${duration}/${workarea}`,{});

  }

  Token():Observable<any>{
    return this.http.get(`${environment.hostname}":"${environment.port}/token`);
  }
}
