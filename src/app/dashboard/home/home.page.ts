import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,
    zoom: {
      maxRatio: 5
    }
  };
  vendorImg:any;
  rate = 3;
  homeData: any;
  homeProperty = {
    "vendor_name": "",
    "total_orders": "",
    "total_product": "",
    "total_sale": "",
    "vendorid": ""
  }
  orderData = [];


  constructor(public router: Router,public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,private appComponent: AppComponent,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(() => {
        this.getHomeData();
        this.vendorImg = (this.commonservice.profileDetails.shop_logo)?this.commonservice.profileDetails.shop_logo:"../../assets/images/deliveryboy_icon.png";
    });
     }

  ngOnInit() { 
    this.appComponent.updateData();
    this.invokeService.slientGetMenthod().then((response: any) => {
      this.commonservice.profileDetails = response.data;
      this.vendorImg = (this.commonservice.profileDetails.shop_logo)?this.commonservice.profileDetails.shop_logo:"../../assets/images/deliveryboy_icon.png";
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  wallerPage(){
    this.router.navigate(['dashboard/my-wallet']);
  }

  myOrdersPage(){
    this.router.navigate(['my-orders']);
  }

  ProductsPage(){
    this.router.navigate(['product-list']);
  }achievement

  achievementPage(){
    this.router.navigate(['dashboard/achievement']);
  }

  getHomeData(){
    this.invokeService.postMethod("vendor_dashboard",null).then((response: any) => {
      console.log(response);
      this.homeData = response.data;
      this.homeProperty.total_orders = this.homeData.total_orders;
      this.homeProperty.total_product = this.homeData.total_product;
      this.homeProperty.total_sale = this.homeData.total_sale;
      this.homeProperty.vendor_name = this.homeData.vendor_name;
      this.homeProperty.vendorid = this.homeData.vendorid;
      this.orderData = response.data.orders;
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }
}
