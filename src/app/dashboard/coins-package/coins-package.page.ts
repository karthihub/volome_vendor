import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';
declare var RazorpayCheckout:any;
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-coins-package',
  templateUrl: './coins-package.page.html',
  styleUrls: ['./coins-package.page.scss'],
})

export class CoinsPackagePage implements OnInit {
  public subcriptionDetails:any;
  public subcriptionList = [];
  momentjs: any = moment;
  validityDays:any = "0";
  pageTitle = "";
  constructor(public router: Router,public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.getsubcriptionData();
       })
     }

  ngOnInit() {
  }

  getsubcriptionData(){
    this.invokeService.postMethod("vendor_subscriptionpackages", null).then((response: any) => {
      this.subcriptionDetails = response;
      this.subcriptionList = response.data;
      this.pageTitle = response.title;
      var startDate = moment(this.subcriptionDetails.subscription_start_date, 'DD-MM-YYYY'); 
      var endDate = moment(this.subcriptionDetails.subscription_end_date, 'DD-MM-YYYY');
      if(endDate.diff(startDate, 'days')){
        this.validityDays = endDate.diff(startDate, 'days');
      }
      
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }


  payWithRazorpay(package_id, price) {
    let total = parseInt(price)*100;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: "INR", // your 3 letter currency code
      key: "rzp_live_1S8bCtAZ36SC3r", // your Key Id from Razorpay dashboard
      amount:   total,
      name: 'Volome',
      prefill: {
        email: 'volomefund@gmail.com',
        contact: '9004130377',
        name: 'Volome'
      },
      theme: {
        color: '#ff8635'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };

    var successCallback = function (payment_id) {
      // alert('payment_id: ' + payment_id);
      var payload = {
        "package_id": package_id,
        "transaction_id": payment_id
      };
      this.puchaseConfirm(payload);
    };

    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

  puchaseConfirm(payload) {
    this.invokeService.postMethod("vendor_subscriptionpackage_confirm", payload).then((response: any) => {
      this.ShowSuccessPopup();
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  async ShowSuccessPopup(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Volome',
      message: 'Your subcription period updated successfully.',
      buttons: [{
          text: 'Refresh',
          handler: () => {
              this.getsubcriptionData();
          }
        }]
    });

    await alert.present();
  }

}
