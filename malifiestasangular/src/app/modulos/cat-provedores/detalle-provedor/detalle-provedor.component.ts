import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Proveedores } from 'src/app/models/proveedores.model';

@Component({
  selector: 'app-detalle-provedor',
  templateUrl: './detalle-provedor.component.html',
  styleUrls: ['./detalle-provedor.component.css']
})
export class DetalleProvedorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetalleProvedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proveedores,
  ) {
   }

  ngOnInit(): void {
  }

}
