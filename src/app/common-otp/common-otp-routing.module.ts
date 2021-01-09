import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonOtpPage } from './common-otp.page';

const routes: Routes = [
  {
    path: '',
    component: CommonOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonOtpPageRoutingModule {}
