import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatProvedoresComponent } from './modulos/cat-provedores/cat-provedores.component';
import { PanelComponent } from './modulos/panel/panel.component';

const routes: Routes = [
  {
    path: "",
    children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
