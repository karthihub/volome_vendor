import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { CommonServiceService } from '../../../../service/common-service.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ModalController } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  marker: any;
  address: string;

  latitude: number;
  longitude: number;
  latLng: any;
  
  constructor( private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public router: Router,
    private locationAccuracy: LocationAccuracy,
    public commonService:CommonServiceService,
    public androidPermissions: AndroidPermissions,
    public modalController: ModalController) { }

  ngOnInit() {
    this.loadMap();
  } 

  loadMap() {

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            
          },
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });
    
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
      this.marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
     
      this.map.addListener('click', (resp) => {
        this.marker.setPosition(resp.latLng);
        this.marker.setVisible(true);
        // this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.commonService.shop_latlang.lat = this.map.center.lat();
        this.commonService.shop_latlang.lang = this.map.center.lng();

      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
        var current:any = document.getElementById("pac-input");
        current.value = this.address;
        this.commonService.userAddress = this.address;
        var tempAddress = this.address.split(",");
        this.commonService.address = tempAddress[1] +","+tempAddress[2];
        this.commonService.city = tempAddress[3];
        this.commonService.state = tempAddress[4];
        this.commonService.zipcode = tempAddress[5];
        console.log("this.address------->>", this.address);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }


  start(){
    console.log("next page click");
    this.router.navigate(['dashboard']);
  }

  dismiss(value) {
    this.modalController.dismiss({
      'dismissed': value
    });
  }

}
