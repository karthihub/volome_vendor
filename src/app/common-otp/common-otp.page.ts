import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../service/common-service.service';
import { InvokeServiceService } from '../service/invoke-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-common-otp',
  templateUrl: './common-otp.page.html',
  styleUrls: ['./common-otp.page.scss'],
})
export class CommonOtpPage implements OnInit {

  public req:any = {
      "mobile":"",
      "otp":""
  }
  constructor(public router: Router,
    public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    public navCtrl:NavController) { }

  ngOnInit() {
    this.req.mobile = this.commonservice.mobileNumber;
  }

  submitOTP(){
    // console.log(this.req);
    if(this.req.mobile.length!=10){
      this.commonservice.presentToastWithButton("Please Enter valid Mobile number");
      return false;
    }else if(!this.req.otp){
      this.commonservice.presentToastWithButton("Please Enter valid OTP");
      return false;
    }else{
      var payload = {
        "mobile": this.req.mobile,
        "otp": this.req.otp,
        "fcmToken": this.commonservice.FCMtoken
      }
      this.invokeService.postMethod("vendor_verifyotp",payload).then((response: any) => {
        console.log(response);
        this.commonservice.userDetails = response;
        this.commonservice.user_id = response.vendor_id;
        this.commonservice.access_token = response.access_token;
        this.router.navigate(['dashboard']);
      }).catch((err) => {
        this.commonservice.presentToastWithButton(err);
        console.log(err);
      });
    }
  }

  resendOTP(){
    this.invokeService.postMethod("vendor_sendotp",{"mobile": this.req.mobile}).then((response: any) => {
      console.log(response);
      this.commonservice.presentToastWithButton("OTP Resend Successfully");
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

}
