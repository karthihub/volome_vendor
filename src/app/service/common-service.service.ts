import { Injectable, NgZone } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})


export class CommonServiceService {
  loading: HTMLIonLoadingElement;

  latlang:any = {
    lat : "",
    lang : ""
  }
  public address = "";
  public city = "";
  public state = "";
  public zipcode = "";

  public access_token:any = "";
  public userDetails:any = "";
  public mobileNumber:any = "";
  isProfileEdit: boolean;
  selectedLanguage = "en";
  public cartValue = 0;
  public userAddress = "";
  public cartAmount:any = "";
  public user_id:any = "";

  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private navCtrl: NavController,
    private ngZone: NgZone,private storage: Storage,) { }

  async presentLoading(message?: string) {
    message = message ? message : 'Please wait...'
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: message,
      cssClass: 'custom-loading'
    });
    await this.loading.present();
  }

  
  dismissLoading() {
    this.loading.dismiss();
  }

  async presentToastWithButton(header: string, position: any = 'top') {
    const toast = await this.toastCtrl.create({
      mode: 'ios',
      header: header,
      // message: message,
      position: position,
      cssClass: "toast-class",
      duration: 5000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async getGeolocation(){

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            this.geolocation.getCurrentPosition().then((resp) => {
              this.latlang.lat =  resp.coords.latitude;
              this.latlang.lang = resp.coords.longitude;
              console.log("getGeolocation====>>", this.latlang);
             }).catch((error) => {
               console.log('Error getting location', error);
             });
          },
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });

    
  }

  logout(){
    this.navCtrl.navigateForward('/login');
      this.navCtrl.setDirection('root');
  }

  navigateForward(pageName: string, isRoot = false) {
    this.ngZone.run(() => {
      this.navCtrl.navigateForward('/' + pageName);
      if (isRoot) {
        this.navCtrl.setDirection('root');
      }
    });
  }

  navigateBack(pageName: string) {
    this.ngZone.run(() => {
      this.navCtrl.navigateBack('/' + pageName);
    });
  }

  navigationPop() {
    this.ngZone.run(() => {
      this.navCtrl.pop();
    });
  }

  navigationBack() {
    this.ngZone.run(() => {
      this.navCtrl.back();
    });
  }

  setStorage(key: string, value: any) {
    this.storage.set(key, value);
  }
  async getStorage(key: string) {
    // return this.storage.get(key);
    return this.storage.get(key).then((val) => {
      return val;
    });
  }

  deleteStorage() {
    this.storage.clear();
  }

  convertToDataURLviaCanvas(url, outputFormat){
    return new Promise((resolve, reject) => {
    let img = new Image();
    console.log(outputFormat)
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
      canvas = null;
    };
    img.src = url;
  });
}
 getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
      const base64data = reader.result;   
      resolve(base64data);
    }
  });
}

}
