import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../../service/common-service.service';
import { InvokeServiceService } from '../../service/invoke-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public profile = {
    "full_name": "",
    "shop_name": "",
    "mobile": "",
    "email": "",
    "location": "",
    "state": "",
    "district": "",
    "pincode": "",
    "latitude": "",
    "longitude": "",
    "delivery_charge": "",
    "notification_count": "",
    "shop_logo": ""
  }

  constructor(public router: Router,public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    private activatedRouter: ActivatedRoute,) { 
      activatedRouter.params.subscribe(val => {
        this.getProfileData();
      }) 
    }

  ngOnInit() {
  }

  eidtProfile(){
    this.router.navigate(['dashboard/profile/profile-edit']);
  }

  getProfileData(){
    this.invokeService.postMethod("vendor_get_profile",null).then((response: any) => {
      console.log(response);
      this.commonservice.profileDetails = response.data;
      this.profile.full_name = response.data.full_name;
      this.profile.shop_name = response.data.shop_name;
      this.profile.mobile = response.data.mobile;
      this.profile.email = response.data.email;
      this.profile.location = response.data.location;
      this.profile.state = response.data.state;
      this.profile.district = response.data.district;
      this.profile.location = response.data.location;
      this.profile.pincode = response.data.pincode;
      this.profile.latitude = response.data.latitude;
      this.profile.longitude = response.data.longitude;
      this.profile.delivery_charge = response.data.delivery_charge;
      this.profile.notification_count = response.data.notification_count;
      this.profile.shop_logo = response.data.shop_logo;
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

}
