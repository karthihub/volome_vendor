import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'common-otp',
    loadChildren: () => import('./common-otp/common-otp.module').then( m => m.CommonOtpPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'pick-location',
    loadChildren: () => import('./pick-location/pick-location.module').then( m => m.PickLocationPageModule)
  },
  {
    path: 'add-products',
    loadChildren: () => import('./products/add-products/add-products.module').then( m => m.AddProductsPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./products/product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'select-categories',
    loadChildren: () => import('./products/select-categories/select-categories.module').then( m => m.SelectCategoriesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
