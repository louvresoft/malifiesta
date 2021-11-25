import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { CatProvedoresComponent } from '../cat-provedores.component';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css']
})
export class FormProveedorComponent implements OnInit {
  form: FormGroup;
  @ViewChild(CatProvedoresComponent) child;
  constructor(private catalogosService: CatalogosService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      telefono2: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      direccion: new FormControl("", Validators.required),
    });
  }

  onSubmit(datos:any){
    this.catalogosService.postProveedores(datos).subscribe(resp =>{
      
      Swal.fire(
        'Guardado Correctamente',
        '',
        'success'
      )
      window.location.reload();
    })
  }

}
