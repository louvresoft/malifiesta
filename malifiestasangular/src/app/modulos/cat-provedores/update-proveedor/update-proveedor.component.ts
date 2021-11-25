import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Proveedores } from 'src/app/models/proveedores.model';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-update-proveedor',
  templateUrl: './update-proveedor.component.html',
  styleUrls: ['./update-proveedor.component.css']
})
export class UpdateProveedorComponent implements OnInit {
  form: FormGroup;
  constructor(private catalogosService: CatalogosService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<UpdateProveedorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { 
                console.log("data=>", data)
    this.form = this.formBuilder.group({
      nombre: [""],
      telefono: [""],
      telefono2: [""],
      direccion: [""],
    });
  }

  ngOnInit(): void {
    this.catalogosService.getProvedoresDetalle(this.data.id).subscribe(response =>{
      console.log("response ==>", response);
    })
    
  }

}
