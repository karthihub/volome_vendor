import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, AlertController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationData: any;

  constructor(public router: Router,public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    private route: ActivatedRoute,
    public alertController: AlertController) {}

  ngOnInit() {
    this.invokeService.postMethod("vendor_notifications",null).then((response: any) => {
      console.log(response);
      this.notificationData = response.data;
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }
  
  getDataTime(dateTime){
    // 2021-03-03 14:37:01
    return moment(dateTime.split(" ")[0], 'YYYY.MM.DD').format('Do MMM YYYY');
  }
}
