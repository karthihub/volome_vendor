import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonServiceService } from '../service/common-service.service';
import { InvokeServiceService } from '../service/invoke-service.service';
import { PickLocationPage } from '../pick-location/pick-location.page';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  req:any={
    "full_name":"",
    "mobile":"",
    "email":"",
    "location":"",
    "district":"CBE",
    "state":"TN",
    "pincode":"",
    "shop_name":"",
    "shop_logo":"",
    "latitude":"",
    "longitude":""
  }
  base64Image = [];
  constructor(public actionSheetController: ActionSheetController,
    public camera: Camera, public imageCompress: NgxImageCompressService,
    public commonservice: CommonServiceService, public invokeService: InvokeServiceService,
    public router: Router, private navCtrl: NavController, public modalController: ModalController) { }

  ngOnInit() {
    this.commonservice.getGeolocation();
  }

  register(){
    // console.log(this.req);
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(this.req.mobile.length!=10){
      this.commonservice.presentToastWithButton("Please Enter valid Mobile number");
      return false;
    }else if(!this.req.shop_name){
      this.commonservice.presentToastWithButton("Please Enter valid Shop Name");
      return false;
    }else if(!this.req.email){
      this.commonservice.presentToastWithButton("Please Enter Email ID");
      return false;
    }else if(!this.req.email.match(mailformat)){
      this.commonservice.presentToastWithButton("Please Enter valid Email ID");
      return false;
    }else if(!this.req.shop_logo){
      this.commonservice.presentToastWithButton("Please upload Shop Logo");
      return false;
    }else if(!this.req.full_name){
      this.commonservice.presentToastWithButton("Please Enter valid Full Name");
      return false;
    }else if(!this.req.location){
      this.commonservice.presentToastWithButton("Please Enter valid Location");
      return false;
    }else if(!this.req.pincode){
      this.commonservice.presentToastWithButton("Please Enter valid Pin Code");
      return false;
    }else{

      this.req.latitude = this.commonservice.latlang.lat;
      this.req.longitude = this.commonservice.latlang.lang;
      var data = this.base64Image[0].split(",");

      var requestData = {
        "full_name": this.req.full_name,
        "mobile": this.req.mobile,
        "email": this.req.email,
        "location": this.req.location,
        "district": "CBE",
        "state":"TN",
        "pincode": this.req.pincode,
        "shop_name": this.req.shop_name,
        "shop_logo": data[1],
        "latitude": this.commonservice.latlang.lat,
        "longitude": this.commonservice.latlang.lang,
      }

      this.invokeService.postMethod("vendor_register",requestData).then((response: any) => {
        console.log(response);
        this.commonservice.mobileNumber = this.req.mobile;
        this.commonservice.user_id = response.vendor_id;
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

  async openCameraPopup() {
    if (!this.base64Image) {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    } else {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Remove image',
          handler: () => {
            // this.profileimg = "../././assets/images/user.svg";
            this.base64Image = [];
            this.req.shop_logo = "";
          }
        },
        {
          text: 'Cancel',
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

    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);

      let base64 = 'data:image/jpeg;base64,' + imageData;

      if (this.imageCompress.byteCount(base64) > 2097152) {
        //  alert('image size is big');
        this.compressFile(base64);
      } else {
        // this.profileimg = base64;
        // this.base64Image = this.profileimg;
        this.base64Image = [];
        this.base64Image.push(base64);
        this.req.shop_logo = "Uploaded..";
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
        // this.profileimg = result;
        // this.base64Image = this.profileimg;
        this.base64Image = [];
        this.base64Image.push(result);
        this.req.shop_logo = "Uploaded..";
      });
  }

  async openLocationPopup() {
    const modal = await this.modalController.create({
      component: PickLocationPage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss()
      .then((data) => {
        this.req.location = this.commonservice.address;
        this.req.district = this.commonservice.city;
        this.req.state = this.commonservice.state;
        this.req.pincode = this.commonservice.zipcode; 
    });

    return await modal.present();
  }

}
