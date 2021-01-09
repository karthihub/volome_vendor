import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonOtpPageRoutingModule } from './common-otp-routing.module';

import { CommonOtpPage } from './common-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonOtpPageRoutingModule
  ],
  declarations: [CommonOtpPage]
})
export class CommonOtpPageModule {}
