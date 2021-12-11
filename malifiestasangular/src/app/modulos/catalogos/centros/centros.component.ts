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



import { Centros } from 'src/app/models/centros.models';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})

export class CentrosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'centro', 'nomenglatura', 'descripcion','sociedad','actions'];
  dataSource : MatTableDataSource<Centros> = new MatTableDataSource([]);  
  searchValue: string = "";
  search: Observable<string>;
  no_peticion: string = "";
  resultsLength = 0;
  existeData: boolean= false;
  // modals cruds
  closeResult = '';
  detalleCentroData:any;
  detalleCentroDataBandera: boolean = false;
  updateSociedadDataBandera: boolean = false;
  crearSociedadDataBandera: boolean = false;

  idActualizar:number = 0;
  sociedadesList :any;

  formCrear: FormGroup;
  formEditar: FormGroup;

  @ViewChild('inputSearch', {static: true}) inputSearch: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private catalogosService: CatalogosService, private activatedRoute: ActivatedRoute, 
    private modalService: NgbModal,private formBuilder: FormBuilder,) { }

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

    this.obtenerSociedades();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerCentros();
  }

  
  obtenerCentros(): void{
    merge( this.paginator.page, this.search)
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.catalogosService.getCentros(
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

  detalleCentro(id: number, content): void{
    this.detalleCentroDataBandera = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });

    this.catalogosService.getCentroDetalle(id).subscribe(
      resp =>{
        this.detalleCentroDataBandera = true;
          this.detalleCentroData = resp;
      }
    )
  }

  editarFormSociedad(id: number, contentEditarSociedad){
    this.idActualizar = id;
    this.formEditar = this.formBuilder.group({
      sociedad: [""],
      nomenglatura: [""],
      descripcion: [""],
      centro: [""],
    });


    this.modalService.open(contentEditarSociedad, {size: 'sm'}).result.then((result)=>{
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });

    this.catalogosService.getCentroDetalle(id).subscribe(response =>{
      this.formEditar.controls["descripcion"].setValue(response["descripcion"]);
      this.formEditar.controls["sociedad"].setValue(response["sociedad"]);
      this.formEditar.controls["nomenglatura"].setValue(response["nomenglatura"]);
      this.formEditar.controls["centro"].setValue(response["centro"]);
    })

  }

  editarSociedad(data:any){
    this.catalogosService.updateCentros(data, this.idActualizar).subscribe(response =>{
      this.obtenerCentros();
      Swal.fire(
        'Actualizado!',
        'Tu registro fue correctamente actualizado.',
        'success'
      )
      this.modalService.dismissAll();
    })
  }

  crearFormCentro(contentCrearSociedad){
    this.crearSociedadDataBandera = true;
    this.formCrear = new FormGroup({
      centro: new FormControl("", Validators.required),
      nomenglatura: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      sociedad: new FormControl("", Validators.required),
    });
    this.modalService.open(contentCrearSociedad, {ariaLabelledBy: 'modal-basic-title', size:'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  crearCentro(data:any){
    this.catalogosService.postCentros(data).subscribe( resp =>{
      this.obtenerCentros();
      this.modalService.dismissAll();
      Swal.fire(
        'Guardado!',
        'Tu registro fue correctamente guardado.',
        'success'
      )
    })
  }

  eliminarCentro(id: number){
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
      this.catalogosService.deleteCentros(id).subscribe(resp =>{
        this.obtenerCentros();
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


  obtenerSociedades(){
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
        this.sociedadesList = data.results;
        return data.results;
      }),
      catchError(() => {
        return of([]);
      })
    )
    .subscribe((data) => {
    });
  }

  educationLevelChangeAction(d:any){

  }

}
