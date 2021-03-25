import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoinsPackagePageRoutingModule } from './coins-package-routing.module';

import { CoinsPackagePage } from './coins-package.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoinsPackagePageRoutingModule
  ],
  declarations: [CoinsPackagePage]
})
export class CoinsPackagePageModule {}
