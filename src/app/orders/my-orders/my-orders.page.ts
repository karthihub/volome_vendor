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
  }

  openOrders() {
    console.log("order tapped");
    let navigationExtras: NavigationExtras = { state: { foo: "" } };
    this.router.navigate(['order-details'], navigationExtras);
  }

}
