import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopsCategoriesPageRoutingModule } from './shops-categories-routing.module';

import { ShopsCategoriesPage } from './shops-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopsCategoriesPageRoutingModule
  ],
  declarations: [ShopsCategoriesPage]
})
export class ShopsCategoriesPageModule {}
