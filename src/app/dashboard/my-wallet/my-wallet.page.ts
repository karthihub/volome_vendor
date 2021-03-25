import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, AlertController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,
    zoom: {
      maxRatio: 5
    }
  };

  rate = 3;
  walletData: any;
  walletProperty = {
    "vendor_name": "",
    "total_wallet": "",
    "total_sale": "",
    "month_sale": "",
    "vendorid": ""
  }
  orderData = [];


  constructor(public router: Router,public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,
    private route: ActivatedRoute,
    public alertController: AlertController) {
      this.route.queryParams.subscribe(() => {
        this.getwalletData();
    });
     }

  ngOnInit() { 
  }

  getwalletData(){
    this.invokeService.postMethod("vendor_wallet",null).then((response: any) => {
      console.log(response);
      this.walletData = response.data;
      this.walletProperty.month_sale = this.walletData.month_sale;
      this.walletProperty.total_sale = this.walletData.total_sale;
      this.walletProperty.total_wallet = this.walletData.total_wallet;
      this.walletProperty.vendor_name = this.walletData.vendor_name;
      this.walletProperty.vendorid = this.walletData.vendorid;
      this.orderData = response.data.transaction;
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  getIcon(val){
    if(val == "profit"){
      return "../../assets/images/arrow_green.svg";
    }else{
      return "../../assets/images/arrow_red.svg";
    }
  }

  withDrawAmountRequest(val){
    if(/^\d+$/.test(val)){
      this.invokeService.postMethod("vendor_widthdraw_req",{"amount":val}).then((response: any) => {
        console.log(response);
        this.commonservice.presentToastWithButton(response.message);
        this.getwalletData();
      }).catch((err) => {
        this.commonservice.presentToastWithButton(err);
        console.log(err);
      });
    }else{
      this.commonservice.presentToastWithButton("Please enter valid amount");
    }
    
  }

 async withDrawAmount(){
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'name1',
          type: 'number',
          placeholder: "Please enter Amount"
        }],    
       buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: (alertData) => { //takes the data 
                console.log(alertData.name1);
                this.withDrawAmountRequest(alertData.name1);
            }
            }
          ]
  });
  await alert.present();
  }
}
