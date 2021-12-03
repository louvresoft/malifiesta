import {AfterViewInit, OnInit, Component, ViewChild, ElementRef} from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, of } from 'rxjs';

import { CatalogosService } from 'src/app/services/catalogos.service';

import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { merge } from 'rxjs/internal/observable/merge';



import { Sociedades } from 'src/app/models/sociedades.models';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-sociedades',
  templateUrl: './sociedades.component.html',
  styleUrls: ['./sociedades.component.css']
})
export class SociedadesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'sociedad', 'nomenglatura', 'actions'];
  dataSource : MatTableDataSource<Sociedades> = new MatTableDataSource([]);  
  searchValue: string = "";
  search: Observable<string>;
  no_peticion: string = "";
  resultsLength = 0;
  existeData: boolean= false;
  // modals cruds
  closeResult = '';
  detalleSociedadData:any;
  detalleSociedadDataBandera: boolean = false;
  updateSociedadDataBandera: boolean = false;
  crearSociedadDataBandera: boolean = false;

  idActualizar:number = 0;

  formCrear: FormGroup;
  formEditar: FormGroup;

  @ViewChild('inputSearch', {static: true}) inputSearch: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private catalogosService: CatalogosService, private activatedRoute: ActivatedRoute, 
              private modalService: NgbModal,private formBuilder: FormBuilder,) { }

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
    this.obtenerSociedades();
  }

  obtenerSociedades(): void{
    merge( this.paginator.page, this.search)
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.catalogosService.getSociedades(
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

  detalleSociedad(id: number, content): void{
    this.detalleSociedadDataBandera = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });

    this.catalogosService.getSociedadDetalle(id).subscribe(
      resp =>{
        this.detalleSociedadDataBandera = true;
          this.detalleSociedadData = resp;
      }
    )
  }

  editarFormSociedad(id: number, contentEditarSociedad){
    this.idActualizar = id;
    this.formEditar = this.formBuilder.group({
      sociedad: [""],
      nomenglatura: [""],
    });


    this.modalService.open(contentEditarSociedad, {size: 'sm'}).result.then((result)=>{
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });

    this.catalogosService.getSociedadDetalle(id).subscribe(response =>{
      this.formEditar.controls["sociedad"].setValue(response["sociedad"]);
      this.formEditar.controls["nomenglatura"].setValue(response["nomenglatura"]);
    })

  }

  editarSociedad(data:any){
    this.catalogosService.updateSociedades(data, this.idActualizar).subscribe(response =>{
      this.obtenerSociedades();
      Swal.fire(
        'Actualizado!',
        'Tu registro fue correctamente actualizado.',
        'success'
      )
      this.modalService.dismissAll();
    })
  }

  crearFormSociedad(contentCrearSociedad){
    this.crearSociedadDataBandera = true;
    this.formCrear = new FormGroup({
      sociedad: new FormControl("", Validators.required),
      nomenglatura: new FormControl("", Validators.required)
    });
    this.modalService.open(contentCrearSociedad, {ariaLabelledBy: 'modal-basic-title', size:'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  crearSociedad(data:any){
    this.catalogosService.postSociedades(data).subscribe( resp =>{
      this.obtenerSociedades();
      this.modalService.dismissAll();
      Swal.fire(
        'Guardado!',
        'Tu registro fue correctamente guardado.',
        'success'
      )
    })
  }

  eliminarSociedad(id: number){
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
      this.catalogosService.deleteSociedadades(id).subscribe(resp =>{
        this.obtenerSociedades();
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
