import {AfterViewInit, OnInit, Component, ViewChild, ElementRef} from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { fromEvent, Observable, of } from 'rxjs';
import { merge } from 'rxjs/internal/observable/merge';

import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { CatalogosService } from 'src/app/services/catalogos.service';
import { Productos } from 'src/app/models/productos.models';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'proveedor','modelo','actions'];
  dataSource : MatTableDataSource<Productos> = new MatTableDataSource([]);  
  searchValue: string = "";
  search: Observable<string>;
  no_peticion: string = "";
  resultsLength = 0;
  existeData: boolean= false;
  // modals cruds
  closeResult = '';
  detalleProductoData:any;
  detalleProductoDataBandera: boolean = false;
  updateProductoDataBandera: boolean = false;
  crearProductoDataBandera: boolean = false;



  idActualizar:number = 0;
  productosList :any;

  sociedadesList :any;

  formCrear: FormGroup;
  formEditar: FormGroup;

  @ViewChild('inputSearch', {static: true}) inputSearch: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private catalogosService: CatalogosService, private activatedRoute: ActivatedRoute, 
    private modalService: NgbModal,private formBuilder: FormBuilder,) { }

    ngOnInit(): void {}
/* 
  ngOnInit(): void {
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

    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerProductos();
  }

  obtenerProductos(): void{
    merge( this.paginator.page, this.search)
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.catalogosService.getProductos(
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

  crearCentro(data:any){
    console.log("x");
  }

  editarSociedad(){
    console.log("x");
  }
 */
}
