import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonServiceService } from './service/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public commonservice: CommonServiceService
  ) {
    this.initializeApp();
  }

  public mobileNumber = "";

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
              this.splashScreen.hide();
              localStorage.setItem("MyItemsPersisted", "");
              this.statusBar.backgroundColorByHexString('#00314f');
    });
  }

  updateData(){
    this.mobileNumber = this.commonservice.mobileNumber;
  }
}
