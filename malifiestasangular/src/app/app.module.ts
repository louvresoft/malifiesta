import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './modulos/panel/panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CatProvedoresComponent } from './modulos/cat-provedores/cat-provedores.component';

import {MaterialModule} from '../material.module';
import { NavbarComponent } from './compartidos/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DetalleProvedorComponent } from './modulos/cat-provedores/detalle-provedor/detalle-provedor.component';
import { FormProveedorComponent } from './modulos/cat-provedores/form-proveedor/form-proveedor.component';
import { UpdateProveedorComponent } from './modulos/cat-provedores/update-proveedor/update-proveedor.component';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    CatProvedoresComponent,
    NavbarComponent,
    DetalleProvedorComponent,
    FormProveedorComponent,
    UpdateProveedorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
