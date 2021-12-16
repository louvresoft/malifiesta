import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatProvedoresComponent } from './modulos/cat-provedores/cat-provedores.component';
import { CategoriasComponent } from './modulos/catalogos/categorias/categorias.component';
import { CentrosComponent } from './modulos/catalogos/centros/centros.component';
import { CrearProductoComponent } from './modulos/catalogos/productos/crear-producto/crear-producto.component';
import { ProductosComponent } from './modulos/catalogos/productos/productos.component';
import { SociedadesComponent } from './modulos/catalogos/sociedades/sociedades.component';
import { PanelComponent } from './modulos/panel/panel.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: 'full'
      },
      {
        path: "dashboard",
        component: PanelComponent,
        data: { titulo: "Menu Principal" }
      },
      {
        path: "proveedores",
        component: CatProvedoresComponent,
        data: { titulo: "Menu Principal" }
      },
      {
        path: "sociedades",
        component: SociedadesComponent,
        data: { titulo: "Menu Principal" }
      },
      {
        path: "categorias",
        component: CategoriasComponent,
        data: { titulo: "Menu Principal" }
      },
      {
        path: "centros",
        component: CentrosComponent,
        data: { titulo: "Centros" }
      },
      {
        path: "productos",
        component: ProductosComponent,
        data: { titulo: "Productos" }
      },
      {
        path: "productos-crear",
        component: CrearProductoComponent,
        data: { titulo: "Crear Producto" }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
