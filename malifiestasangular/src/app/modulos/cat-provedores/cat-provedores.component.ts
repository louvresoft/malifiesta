import {AfterViewInit, OnInit, Component, ViewChild, ElementRef} from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { fromEvent, Observable, of } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs/internal/observable/merge';
import { MatTableDataSource} from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';

import { CatalogosService } from 'src/app/services/catalogos.service';
import { DetalleProvedorComponent } from './detalle-provedor/detalle-provedor.component';
import { FormProveedorComponent } from './form-proveedor/form-proveedor.component';
import Swal from 'sweetalert2';
import { UpdateProveedorComponent } from './update-proveedor/update-proveedor.component';

export interface Proveedores {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

@Component({
  selector: 'app-cat-provedores',
  templateUrl: './cat-provedores.component.html',
  styleUrls: ['./cat-provedores.component.css']
})
export class CatProvedoresComponent implements OnInit, AfterViewInit  {

  @ViewChild('inputSearch', {static: true}) inputSearch: ElementRef;


  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'direccion', 'actions'];

  resultsLength = 0;
  dataSource : MatTableDataSource<Proveedores> = new MatTableDataSource([]);  
  data: Proveedores[];
  searchValue: string = "";
  search: Observable<string>;
  no_peticion: string = "";
  id: string;

  dataDetalleProveedor: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  existeData: boolean= false;

  constructor(private catalogosService: CatalogosService, private activatedRoute: ActivatedRoute,
              public dialog: MatDialog ){}

  ngOnInit() {

    this.search = fromEvent(this.inputSearch.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(700),
      distinctUntilChanged()
    );

    this.search.subscribe((text: string) => {      
      this.searchValue = text.trim().toLowerCase();
      this.paginator.pageIndex = 0;
    });

    this.activatedRoute.params.subscribe( 
      params => {
        let no_peticion = params[`no_peticion`];
        if(no_peticion){
          this.no_peticion = no_peticion;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerProveedores();
  }



   obtenerProveedores(): void{
    merge( this.paginator.page, this.search)
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.catalogosService.getProveedores(
          this.searchValue,
          this.paginator.pageSize,
          this.paginator.pageIndex
        );
      }),
      map((data) => {
        this.resultsLength = data.count;
        return data.results;
      }),
      catchError(() => {
        return of([]);
      })
    )
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if(this.dataSource.data.length > 0){
        this.existeData = true;
      }
      else
        this.existeData = false;
    });
  }

  detalleProveedor(id: number){
    this.catalogosService.getProvedoresDetalle(id).subscribe(resp =>{
      this.dataDetalleProveedor = resp;
      const dialogRef = this.dialog.open(DetalleProvedorComponent, {
        panelClass: 'app-dialog',
        width: '500px',
        data: this.dataDetalleProveedor
      });
    })
  }

  crearProveedor(){
    const dialogRef = this.dialog.open(FormProveedorComponent, {
      panelClass: 'app-dialog',
      
    });
  }

  eliminarProveedor(id:number){
    Swal.fire({
      title: 'Estas seguro que deseas eliminarlo?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#b0bec5',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.catalogosService.deleteProveedor(id).subscribe(response =>{
          this.obtenerProveedores();
        })
        Swal.fire(
          'Eliminado!',
          'Tu registro fue correctamente eliminado.',
          'success'
        )
      }
    })
  }

  updateProvedor(id: number){
    const dialogRef = this.dialog.open(UpdateProveedorComponent, {
      panelClass: 'app-dialog',
      width: '500px',
      data: {id: id}
    });
  }
  
}





