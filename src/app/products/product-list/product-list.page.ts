import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  public productList = [];
  constructor(public router: Router,public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProductData();
  }

  getProductData(){
    this.invokeService.postMethod("myproducts?page_id=1&limit=20",null).then((response: any) => {
      console.log(response);
      this.productList = [];
      this.productList = response.data;
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  deleteProduct(product_id){
    this.invokeService.postMethod("vendor_deleteProduct/"+product_id,null).then((response: any) => {
      console.log(response);
      this.commonservice.presentToastWithButton(response.message);
      this.getProductData();
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  editProduct(product_id){
    this.invokeService.postMethod("getProductInfo/"+product_id,null).then((response: any) => {
      console.log(response);
      this.commonservice.getProductInfo = response.data;
      this.invokeService.postMethod("category_attributes/"+response.data.category_id,null).then((response: any) => {
        this.commonservice.select_categoryData = response.data;
        this.commonservice.isEditProduct = true;
        this.router.navigate(['/add-products']);
      }).catch((err) => {
        this.commonservice.presentToastWithButton(err);
        console.log(err);
      });
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  getDiscount(val){
    var percentage = val.split("%");
    percentage = parseFloat(percentage).toFixed(2);
    return percentage;
  }

}