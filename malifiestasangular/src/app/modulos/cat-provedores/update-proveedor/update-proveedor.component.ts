import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CatalogosService } from 'src/app/services/catalogos.service';
import Swal from 'sweetalert2';

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
      this.form.controls["nombre"].setValue(response["nombre"]);
      this.form.controls["telefono"].setValue(response["telefono"]);
      this.form.controls["telefono2"].setValue(response["telefono2"]);
      this.form.controls["direccion"].setValue(response["direccion"]);
    })
  }

  onSubmit( formdata:any){
    this.catalogosService.updateProveedor(this.data.id, formdata).subscribe(response =>{
      Swal.fire(
        'Guardado Correctamente',
        '',
        'success'
      )
      window.location.reload();

    })
  }

}
