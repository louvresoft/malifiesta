import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';





export interface Proveedores {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface PeticionesApi {
  results: any[];
  count: number;
  next: null;
  previous: null;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private _auth: AuthService, private http: HttpClient) { }

  obtenerProvedores2(){
    const url: string = this._auth.getUrlProyect() + 'api/cat/proveedores/';
    return this.http.get<Proveedores>(url).pipe();
  }


  getProveedores(filter: string, limit = 5, page = 0): Observable<any> {
    let offset = page * limit;
    let filtro = 0;
    let params = "";
    if(filter != ""){
      filtro = parseInt(filter);
      params = "api/cat/proveedores/?search="+filtro+"&limit="+ limit +"&offset="+offset;
    }
    else {
      params = "api/cat/proveedores/?limit="+ limit +"&offset="+offset;
    }

    return this.http.get<PeticionesApi>(this._auth.getUrlProyect() + params).pipe(
      tap((response: any) => {
      }),
      catchError(e => {
        if (e.status == 400) {
            //Swal.fire('Info', e.error.detail, 'warning');
            return throwError(e);
        }
       // Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
 }

  getProvedoresDetalle(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/cat/proveedores/'+ id +'/';
    console.log("id", url);
    return this.http.get<Proveedores>(url).pipe();
  }

  postProveedores(datos: any){
    const url: string = this._auth.getUrlProyect() + 'api/cat/proveedores/';
    return this.http.post(url, datos);
  }

  deleteProveedor(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/cat/proveedores/'+ id +'/';
    return this.http.delete(url);
  }
  updateProveedor(id:number, data:any){
    const url: string = this._auth.getUrlProyect() + 'api/cat/proveedores/'+ id +'/';
    return this.http.put(url, data);
  }
}
