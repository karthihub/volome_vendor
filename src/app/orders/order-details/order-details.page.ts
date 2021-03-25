import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  orderDetails:any;
  orderHistory = [];
  constructor(public router: Router,
    private commonservice: CommonServiceService,
    public invokeService: InvokeServiceService,
    private activatedRoute: ActivatedRoute) { 
    }

  ngOnInit() {
    this.orderDetails = this.commonservice.orderDetails;
    this.orderHistory = this.commonservice.orderDetails.order.order_history;
    console.log(this.orderDetails);
  }

  getDiscountAmount(discount_amount){
    if(discount_amount){
      return discount_amount;
    }else{
      return "0";
    }
  }

}
