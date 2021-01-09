import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../service/common-service.service';
import { InvokeServiceService } from '../service/invoke-service.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  req:any=
  {
    "mobile":""
  };
  constructor(public router: Router,
    public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    public androidPermissions:AndroidPermissions) { }

  ngOnInit() {
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA,this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])
          .then(
            (res) => {
              console.log('requestPermission requesting location permissions ', res)
            },
            error => {
              //Show alert if user click on 'No Thanks'
              // navigator['app'].exitApp();
              console.log('requestPermission Error requesting location permissions ', error)
            }
          );
  }

  dontHaveAccount(){
    this.router.navigate(['/register']);
  }

  signIn(){
    // console.log(this.req);
    if(this.req.mobile.length!=10){
      this.commonservice.presentToastWithButton("Please Enter valid Mobile number");
      return false;
    }else{
      this.invokeService.postMethod("vendor_login",this.req).then((response: any) => {
        console.log(response);
        this.commonservice.mobileNumber = this.req.mobile;
        this.commonservice.user_id = response.user_id;
        this.commonservice.presentToastWithButton(response.message);
        this.router.navigate(['/common-otp']);
      }).catch((err) => {
        this.commonservice.presentToastWithButton(err);
        console.log(err);
      });
    }
  }

}
