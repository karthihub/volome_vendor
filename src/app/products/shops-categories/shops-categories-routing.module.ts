import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopsCategoriesPage } from './shops-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ShopsCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsCategoriesPageRoutingModule {}
