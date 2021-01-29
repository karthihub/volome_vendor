import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../../service/common-service.service';
import { InvokeServiceService } from '../../../service/invoke-service.service';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddressPage } from './address/address.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  req:any=
  {
    "full_name":"",
    "mobile":"",
    "email":"",
    "location":"",
    "district":"",
    "state":"",
    "pincode":"",
    "shop_name":"",
    "shop_logo":"",
    "latitude":"",
    "longitude":"",
    "delivery_charge":""
  };
  location = "";
  constructor(public router: Router,
    public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    public navCtrl:NavController,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public camera: Camera, 
    public imageCompress:NgxImageCompressService) { }

  ngOnInit() {
    this.req.full_name = this.commonservice.profileDetails.full_name;
    this.req.mobile = this.commonservice.profileDetails.mobile;
    this.req.email = this.commonservice.profileDetails.email;

    this.req.location = this.commonservice.profileDetails.location;
    this.req.district = this.commonservice.profileDetails.district;
    this.req.state = this.commonservice.profileDetails.state;
    this.req.pincode = this.commonservice.profileDetails.pincode;
    this.req.shop_name = this.commonservice.profileDetails.shop_name;
    this.req.shop_logo = this.commonservice.profileDetails.shop_logo;
    this.req.latitude = this.commonservice.profileDetails.latitude;
    this.req.longitude = this.commonservice.profileDetails.longitude;
    this.req.delivery_charge = this.commonservice.profileDetails.delivery_charge;
    this.location = this.req.latitude +","+ this.req.latitude;
    this.commonservice.shop_latlang.lat = this.req.latitude;
    this.commonservice.shop_latlang.lang = this.req.longitude;
  }

  editProfile(){
    // console.log(this.req);
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(this.req.mobile.length!=10){
      this.commonservice.presentToastWithButton("Please Enter valid Mobile number");
      return false;
    }else if(!this.req.full_name){
      this.commonservice.presentToastWithButton("Please Enter valid Owner Name");
      return false;
    }else if(!this.req.shop_name){
      this.commonservice.presentToastWithButton("Please Enter valid Shope Name");
      return false;
    }else if(!this.req.email){
      this.commonservice.presentToastWithButton("Please Enter Email ID");
      return false;
    }else if(!this.req.email.match(mailformat)){
      this.commonservice.presentToastWithButton("Please Enter valid Email ID");
      return false;
    }else if(!this.req.location){
      this.commonservice.presentToastWithButton("Please Enter valid Location");
      return false;
    }else if(!this.req.district){
      this.commonservice.presentToastWithButton("Please Enter valid District");
      return false;
    }else if(!this.req.state){
      this.commonservice.presentToastWithButton("Please Enter valid State");
      return false;
    }else if(!this.req.pincode){
      this.commonservice.presentToastWithButton("Please Enter valid Pincode");
      return false;
    }else if(!this.req.delivery_charge){
      this.commonservice.presentToastWithButton("Please Enter valid Delivery harge");
      return false;
    }else{

      var tempprofileData = this.req.shop_logo;
    var findValue = tempprofileData.indexOf("demo.moziztech.com");
        if(findValue == "-1"){
          var data = tempprofileData.split(",");
          tempprofileData =  data[1];
        }else{
          // var data = tempprofileData.split("/");
          // tempprofileData =  data[7];
          tempprofileData = ""
        }

      var payload = {
        "full_name": this.req.full_name,
        "mobile": this.req.mobile,
        "email": this.req.email,
        "location": this.req.location,
        "district": this.req.district,
        "state": this.req.state,
        "pincode": this.req.pincode,
        "shop_name": this.req.shop_name,
        "shop_logo":tempprofileData,
        "latitude": this.req.latitude,
        "longitude": this.req.longitude,
        "delivery_charge":this.req.delivery_charge
      };

      this.invokeService.postMethod("vendor_update_profile",payload).then((response: any) => {
        console.log(response);
        this.commonservice.presentToastWithButton(response.message);
        this.navCtrl.pop();
      }).catch((err) => {
        this.commonservice.presentToastWithButton(err);
        console.log(err);
      });
    }
  }

  alreadyHaveAnAccount(){
    this.navCtrl.pop();
  }

  async presentAddressModal() {
    const modal = await this.modalController.create({
      component: AddressPage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss()
      .then((data:any) => {
        // if(data.dismissed){
          this.location = this.commonservice.shop_latlang.lat +","+ this.commonservice.shop_latlang.lang;
          this.req.latitude = this.commonservice.shop_latlang.lat;
          this.req.longitude = this.commonservice.shop_latlang.lang;
        // }
    });

    return await modal.present();
  }

  async openCameraPopup() {
    if (!this.req.profile) {
      const actionSheet = await this.actionSheetController.create({
        header: (this.commonservice.selectedLanguage=='en')?"Select Image source":"حدد مصدر الصورة",
        buttons: [{
          text: (this.commonservice.selectedLanguage=='en')?'Load from Library':"تحميل من المكتبة",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: (this.commonservice.selectedLanguage=='en')?'Use Camera':"استخدم الكاميرا",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: (this.commonservice.selectedLanguage=='en')?'cancel':"إلغاء",
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    } else {
      const actionSheet = await this.actionSheetController.create({
        header: (this.commonservice.selectedLanguage=='en')?'Select Image Source':"حدد مصدر الصورة",
        buttons: [{
          text: (this.commonservice.selectedLanguage=='en')?'Load from Library':"تحميل من المكتبة",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: (this.commonservice.selectedLanguage=='en')?'Use Camera':"استخدم الكاميرا",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        // {
        //   text: 'Remove image',
        //   handler: () => {
        //     // this.profileimg = "../././assets/images/user.svg";
        //     this.base64Image = [];
        //   }
        // },
        {
          text: (this.commonservice.selectedLanguage=='en')?'cancel':"إلغاء",
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    }

  }


  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 70,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 144,
      targetWidth: 144

    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);

      let base64 = 'data:image/jpeg;base64,' + imageData;

      if (this.imageCompress.byteCount(base64) > 2097152) {
        //  alert('image size is big');
        this.compressFile(base64);
      } else {
        this.req.profile = base64;
      }
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  compressFile(srcImage) {
    console.log('Size in bytes was:', this.imageCompress.byteCount(srcImage));
    this.imageCompress.compressFile(srcImage, 1, 50, 50).then(
      result => {
        console.log('Size in bytes now:', this.imageCompress.byteCount(result));
        console.log(result);
        this.req.profile = result;
      });
  }

}
