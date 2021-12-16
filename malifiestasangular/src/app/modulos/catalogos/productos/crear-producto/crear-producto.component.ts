import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import {Router} from "@angular/router"


import Swal from 'sweetalert2';

import { CatalogosService } from 'src/app/services/catalogos.service';

interface Estatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  formCrear: FormGroup;

  searchValue: string = "";
  resultsLength = 0;
  categoriasList: any;
  proveedoresList: any;
  search: Observable<string>;
  no_peticion: string = "";

  @ViewChild('inputSearch', {static: true}) inputSearch: ElementRef;

  estatus: Estatus[] = [
    {value: 'LIBERADO', viewValue: 'LIBERADO'},
    {value: 'MANTENIMIENDO', viewValue: 'MANTENIMIENDO'},
    {value: 'BAJA', viewValue: 'BAJA'},
  ];

  constructor(private catalogosService: CatalogosService, private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private router: Router) {
    this.formCrear = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", ),
      proveedor: new FormControl("", Validators.required),
      codigo: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7) ]),
      modelo: new FormControl("", ),
      categoria: new FormControl("", Validators.required),
      precio_compra: new FormControl("", ),
      ganancia: new FormControl("0",),
      precio_renta: new FormControl("0", Validators.required),
      precio_renta_mayoreo: new FormControl("0", ),
      reposicion: new FormControl("0", Validators.required),
      departamento: new FormControl("", Validators.required),
      imagen_frontal: new FormControl(),
      imagen_lateral: new FormControl(),
      imagen_posterior: new FormControl(),
      codigo_barras: new FormControl("", Validators.required),
      alto: new FormControl("0", ),
      largo: new FormControl("0", ),
      ancho: new FormControl("0", ),
      volumen_cm3: new FormControl("0",),
      peso_g: new FormControl("0",),
      pais_origen: new FormControl("",),
      piezas_caja: new FormControl("0", ),
      piezas_tarima: new FormControl( ),
      clasificacion: new FormControl("", ),
      observacion: new FormControl("", ),
      es_kit: new FormControl("False", ),
      maximo: new FormControl("0", ),
      minimo: new FormControl("0",),
      estatus: new FormControl("", Validators.required),
    })
   }

  ngOnInit(): void {
   
    this.obtenerCategorias();
    this.obtenerProveedores();
  }

  crearProducto(data:any){
    this.catalogosService.postProducto(data).subscribe(resp =>{
      console.log(resp);
      Swal.fire(
        'Guardado!',
        'Tu registro fue correctamente guardado.',
        'success'
      );
      this.router.navigate(['/productos'])
    })
  }

  obtenerCategorias(){
    this.catalogosService.getCategoriasSP().subscribe( resp => {
      this.categoriasList = resp['results'];
    });
  }

  obtenerProveedores(){
    this.catalogosService.obtenerProvedores2().subscribe( resp =>{
      this.proveedoresList = resp['results'];
    });
  }

}
