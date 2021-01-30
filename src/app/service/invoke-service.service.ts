import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class InvokeServiceService {
  serverURL = "http://demo.moziztech.com/volome/webservices/";
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

  // getMethod(path: string, payload?: any, loadingMessage?: string) {
  //   payload = (payload) ? '/' + payload : '';
  //   let options: any = { headers: this.appendHeaders() }
  //   return new Promise(async (resolve, reject) => {
  //     await this.commonservice.presentLoading(loadingMessage);
  //     this.httpClient.get(this.serverURL + path,options).subscribe((data: any) => {
  //       console.log(data);
  //       this.commonservice.dismissLoading();
  //       if(data.code==0){
  //         this.commonservice.presentToastWithButton(data.message);
  //       }else{
  //         resolve(data);
  //       }
  //     }, (error) => {
  //       this.commonservice.dismissLoading();
  //       this.commonservice.presentToastWithButton('', 'Please try after some time!');
  //       reject(error);
  //     });
  //   });
  // }

  
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
        'access_token' : 'vbf1sa' //this.commonservice.access_token
      }
    )
    return headers;
  }
}
