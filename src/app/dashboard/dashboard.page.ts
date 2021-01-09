import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('tabs', { static: true, read: IonTabs }) tabRef: IonTabs;
  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    setTimeout(() => {
      console.log("tab");
      this.tabRef.select('home');
    }, 200)
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}
