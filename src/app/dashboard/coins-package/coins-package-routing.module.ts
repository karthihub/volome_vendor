import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinsPackagePage } from './coins-package.page';

const routes: Routes = [
  {
    path: '',
    component: CoinsPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinsPackagePageRoutingModule {}
