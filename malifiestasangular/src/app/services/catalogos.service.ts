import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Categorias } from '../models/categorias.models';
import { Centros } from '../models/centros.models';





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
      params = "api/v1/cat/proveedores/?search="+filtro+"&limit="+ limit +"&offset="+offset;
    }
    else {
      params = "api/v1/cat/proveedores/?limit="+ limit +"&offset="+offset;
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
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/proveedores/'+ id +'/';
    console.log("id", url);
    return this.http.get<Proveedores>(url).pipe();
  }

  postProveedores(datos: any){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/proveedores/';
    return this.http.post(url, datos);
  }

  deleteProveedor(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/proveedores/'+ id +'/';
    return this.http.delete(url);
  }
  updateProveedor(id:number, data:any){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/proveedores/'+ id +'/';
    return this.http.put(url, data);
  }
  
  /*
    Crud Sociedades
  */
    getSociedades(filter: string, limit = 5, page = 0): Observable<any> {
      let offset = page * limit;
      let filtro = 0;
      let params = "";
      if(filter != ""){
        filtro = parseInt(filter);
        params = "api/v1/cat/sociedades/?search="+filtro+"&limit="+ limit +"&offset="+offset;
      }
      else {
        params = "api/v1/cat/sociedades/?limit="+ limit +"&offset="+offset;
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

   getSociedadDetalle(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/sociedades/'+ id +'/';
    return this.http.get<Proveedores>(url).pipe();
  }

  deleteSociedadades(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/sociedades/'+ id +'/';
    return this.http.delete(url);
  }

  postSociedades(data: any){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/sociedades/';
    return this.http.post(url, data);
  }

  updateSociedades(data:any, id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/sociedades/'+ id +'/';
    return this.http.put(url, data);
  }

  /* 
    Crud Categorias
  */

    getCategorias(filter: string, limit = 5, page = 0): Observable<any> {
      let offset = page * limit;
      let filtro = 0;
      let params = "";
      if(filter != ""){
        filtro = parseInt(filter);
        params = "api/v1/cat/categorias/?search="+filtro+"&limit="+ limit +"&offset="+offset;
      }
      else {
        params = "api/v1/cat/categorias/?limit="+ limit +"&offset="+offset;
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

   getCategoriasSP(){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/categorias/';
    return this.http.get<Categorias>(url).pipe();
   }

   getCategoriaDetalle(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/categorias/'+ id +'/';
    return this.http.get<Categorias>(url).pipe();
  }

  deleteCategorias(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/categorias/'+ id +'/';
    return this.http.delete(url);
  }

  postCategorias(data: any){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/categorias/';
    return this.http.post(url, data);
  }

  updateCategorias(data:any, id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/categorias/'+ id +'/';
    return this.http.put(url, data);
  }

   /* 
    Crud Centros
  */

    getCentros(filter: string, limit = 5, page = 0): Observable<any> {
      let offset = page * limit;
      let filtro = 0;
      let params = "";
      if(filter != ""){
        filtro = parseInt(filter);
        params = "api/v1/cat/centros/?search="+filtro+"&limit="+ limit +"&offset="+offset;
      }
      else {
        params = "api/v1/cat/centros/?limit="+ limit +"&offset="+offset;
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

   getCentroDetalle(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/centros/'+ id +'/';
    return this.http.get<Centros>(url).pipe();
  }

  deleteCentros(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/centros/'+ id +'/';
    return this.http.delete(url);
  }

  postCentros(data: any){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/centros/';
    return this.http.post(url, data);
  }

  updateCentros(data:any, id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/centros/'+ id +'/';
    return this.http.put(url, data);
  }

  /* 
    Crud Productos
  */
    getProductos(filter: string, limit = 5, page = 0): Observable<any> {
      let offset = page * limit;
      let filtro = 0;
      let params = "";
      if(filter != ""){
        filtro = parseInt(filter);
        params = "api/v1/cat/productos/?search="+filtro+"&limit="+ limit +"&offset="+offset;
      }
      else {
        params = "api/v1/cat/productos/?limit="+ limit +"&offset="+offset;
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

   getProductoDetalle(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/productos/'+ id +'/';
    return this.http.get<Centros>(url).pipe();
  }

  deleteProductos(id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/productos/'+ id +'/';
    return this.http.delete(url);
  }

  postProducto(data: any){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/productos/';
    return this.http.post(url, data);
  }

  updateProducto(data:any, id: number){
    const url: string = this._auth.getUrlProyect() + 'api/v1/cat/productos/'+ id +'/';
    return this.http.put(url, data);
  }
}
