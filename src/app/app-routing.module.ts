import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./views/layout.component";

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)
      },
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
