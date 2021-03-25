import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  myOrdersData : any;
  profile: any;
  req: any = {
    "orderID": "",
    "orderedTime": "",
    "cutomerName": "",
    "cutomerAddress": "",
    "orderedQuantity":"",
    "orderAmount": ""
  }
  constructor(
    public router: Router,
    private commonservice: CommonServiceService,
    public invokeService: InvokeServiceService
  ) { }

  ngOnInit() {
    this.invokeService.postMethod("vendor_myorders", null).then((response: any) => {
      console.log(response);
      this.myOrdersData = response.data;
      
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
    this.profile = this.commonservice.profileDetails;
  }

  openOrders(orderID) {
    this.invokeService.postMethod("vendor_orderdetail/"+orderID,null).then((response: any) => {
      this.commonservice.orderDetails = response;
      // let navigationExtras: NavigationExtras = { state: { orderItem: orderDetails } };
      this.router.navigate(['order-details']);
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  cancelOrder(orderID){
    this.invokeService.postMethod("vendor_updateorderstatus/"+orderID,{"status":"Cancelled"}).then((response: any) => {
      this.commonservice.presentToastWithButton(response.message);
      this.ngOnInit();
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

}
