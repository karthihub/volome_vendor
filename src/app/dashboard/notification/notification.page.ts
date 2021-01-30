import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationData: any;
  constructor() { }

  ngOnInit() {
    this.notificationData = {
      data: [{
        "date": "29th Jan 2021",
        "notifcationDetails": [{
          "message": "New Order placed",
          "date": "29th Jan 2021",
          "OrderID": "#1234555",
          "notitficatioType": "order"
        },{
          "message": "Order Delivered",
          "date": "29th Jan 2021",
          "OrderID": "#1234555",
          "notitficatioType": "order"
        }, {
          "message": "Payment Received",
          "date": "29th Jan 2021",
          "OrderID": "#1234555",
          "notitficatioType": "payment"
        }, {
          "message": "Amount Withdraw",
          "date": "29th Jan 2021",
          "OrderID": "#1234555",
          "notitficatioType": "payment"
        }, {
          "message": "General Notfication",
          "date": "29th Jan 2021",
          "OrderID": "#1234555",
          "notitficatioType": "general"
        }]
      },
      {
        "date": "30th Jan 2021",
        "notifcationDetails": [{
          "message": "General Notfication",
          "date": "29th Jan 2021",
          "notitficatioType": "general"
        },
        {
          "message": "General Notfication",
          "date": "29th Jan 2021",
          "notitficatioType": "general"
        }]
      },
      {
        "date": "31th Jan 2021",
        "notifcationDetails": [{
          "message": "Order has been placed",
          "date": "29th Jan 2021",
          "OrderID": "#1234555",
          "notitficatioType": "order"
        }]
      }]
    }

    console.log("notificationData--->", this.notificationData)
  }
  
}
