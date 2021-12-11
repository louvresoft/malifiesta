import {AfterViewInit, OnInit, Component, ViewChild, ElementRef} from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

import { fromEvent, Observable, of } from 'rxjs';
import { merge } from 'rxjs/internal/observable/merge';


import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';


import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { CatalogosService } from 'src/app/services/catalogos.service';
import { Categorias } from 'src/app/models/categorias.models';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource : MatTableDataSource<Categorias> = new MatTableDataSource([]);  
  searchValue: string = "";
  search: Observable<string>;
  no_peticion: string = "";
  resultsLength = 0;
  existeData: boolean= false;
  // modals cruds
  closeResult = '';
  detalleCategoriaData:any;
  detalleCategoriaDataBandera: boolean = false;
  updateCategoriaDataBandera: boolean = false;
  crearCategoriaDataBandera: boolean = false;

  idActualizar:number = 0;

  formCrear: FormGroup;
  formEditar: FormGroup;

  @ViewChild('inputSearch', {static: true}) inputSearch: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private catalogosService: CatalogosService, private activatedRoute: ActivatedRoute, 
    private modalService: NgbModal,private formBuilder: FormBuilder) { }


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
    this.obtenerCategorias();
  }

  obtenerCategorias(): void{
    merge( this.paginator.page, this.search)
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.catalogosService.getCategorias(
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

  detalleCategoria(id: number, content): void{
    this.detalleCategoriaDataBandera = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });

    this.catalogosService.getCategoriaDetalle(id).subscribe(
      resp =>{
        this.detalleCategoriaDataBandera = true;
          this.detalleCategoriaData = resp;
      }
    )
  }

  editarFormCategoria(id: number, contentEditarCategoria){
    this.idActualizar = id;
    this.formEditar = this.formBuilder.group({
      nombre: [""],
    });


    this.modalService.open(contentEditarCategoria, {size: 'sm'}).result.then((result)=>{
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });

    this.catalogosService.getCategoriaDetalle(id).subscribe(response =>{
      this.formEditar.controls["nombre"].setValue(response["nombre"]);
    })

  }

  editarCategoria(data:any){
    this.catalogosService.updateCategorias(data, this.idActualizar).subscribe(response =>{
      this.obtenerCategorias();
      Swal.fire(
        'Actualizado!',
        'Tu registro fue correctamente actualizado.',
        'success'
      )
      this.modalService.dismissAll();
    })
  }

  crearFormCategoria(contentCrearCategoria){
    this.crearCategoriaDataBandera = true;
    this.formCrear = new FormGroup({
      nombre: new FormControl("", Validators.required),
    });
    this.modalService.open(contentCrearCategoria, {ariaLabelledBy: 'modal-basic-title', size:'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  crearCategoria(data:any){
    this.catalogosService.postCategorias(data).subscribe( resp =>{
      this.obtenerCategorias();
      this.modalService.dismissAll();
      Swal.fire(
        'Guardado!',
        'Tu registro fue correctamente guardado.',
        'success'
      )
    })
  }

  eliminarCategoria(id: number){
    Swal.fire({
      title: 'Estas seguro que deseas eliminarlo?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      this.catalogosService.deleteCategorias(id).subscribe(resp =>{
        this.obtenerCategorias();
      })
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Tu registro fue correctamente eliminado.',
          'success'
        )
      }
    })
  }

}
