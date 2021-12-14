import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './modulos/panel/panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CatProvedoresComponent } from './modulos/cat-provedores/cat-provedores.component';

import {MaterialModule} from '../material.module';
import { NavbarComponent } from './compartidos/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DetalleProvedorComponent } from './modulos/cat-provedores/detalle-provedor/detalle-provedor.component';
import { FormProveedorComponent } from './modulos/cat-provedores/form-proveedor/form-proveedor.component';
import { UpdateProveedorComponent } from './modulos/cat-provedores/update-proveedor/update-proveedor.component';
import { SociedadesComponent } from './modulos/catalogos/sociedades/sociedades.component';
import { CategoriasComponent } from './modulos/catalogos/categorias/categorias.component';
import { CentrosComponent } from './modulos/catalogos/centros/centros.component';
import { ProductosComponent } from './modulos/catalogos/productos/productos.component';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    CatProvedoresComponent,
    NavbarComponent,
    DetalleProvedorComponent,
    FormProveedorComponent,
    UpdateProveedorComponent,
    SociedadesComponent,
    CategoriasComponent,
    CentrosComponent,
    ProductosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
