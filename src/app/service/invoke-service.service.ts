import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class InvokeServiceService {
  // serverURL = "http://demo.moziztech.com/volome/webservices/";
  serverURL = "http://pvsinfotech.com/volome/webservices/";
  constructor(private httpClient: HttpClient,
    private commonservice: CommonServiceService) { }


  postMethod(path: string, payload: any) {
    // path = path + "?lang=en";
    let options: any = { headers: this.appendHeaders() }
    return new Promise(async (resolve, reject) => {
      await this.commonservice.presentLoading();
      console.log("Requested Data====>>>", payload);
      if(payload){
        this.httpClient.post(this.serverURL + path, payload, options).subscribe((data: any) => {
          console.log(data);
          this.commonservice.dismissLoading();
          if(data.code==0){
            this.commonservice.presentToastWithButton(data.message);
          }else{
            resolve(data);
          }
        }, (error) => {
          this.commonservice.dismissLoading();
          this.commonservice.presentToastWithButton('', 'Please try after some time!');
          reject(error);
        });
      }else{
        this.httpClient.get(this.serverURL + path,options).subscribe((data: any) => {
          console.log(data);
          this.commonservice.dismissLoading();
          if(data.code==0){
            this.commonservice.presentToastWithButton(data.message);
            if(data.message=='Invalid Vendor'){
              this.commonservice.logout();
            }
          }else{
            resolve(data);
          }
        }, (error) => {
          this.commonservice.dismissLoading();
          this.commonservice.presentToastWithButton('', 'Please try after some time!');
          reject(error);
        });
      }
    });
  }

  slientGetMenthod() {
    let options: any = { headers: this.appendHeaders() }
    return new Promise(async (resolve, reject) => {
      this.httpClient.get(this.serverURL + "vendor_get_profile", options).subscribe((data: any) => {
        console.log(data);
        this.commonservice.dismissLoading();
        if(data.code==0){
          //this.commonservice.presentToastWithButton(data.message);
        }else{
          resolve(data);
        }
      }, (error) => {
        //this.commonservice.presentToastWithButton('', 'Please try after some time!');
        reject(error);
      });
    });
  }

  
  appendHeaders() {
    let headers: HttpHeaders;
    // headers = new HttpHeaders(
    //   {
    //     'Content-Type': 'application/json',
    //     'access_token': this.commonservice.access_token
    //   }
    // )

    headers = new HttpHeaders(
      {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json',
        'access-token' : this.commonservice.access_token
      }
    )
    return headers;
  }
}
//'vbf1sa'

// this.commonservice.access_token
