import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonServiceService } from '../../service/common-service.service';
import { InvokeServiceService } from '../../service/invoke-service.service';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.page.html',
  styleUrls: ['./select-categories.page.scss'],
})
export class SelectCategoriesPage implements OnInit {
  req: any = {

  }
  categoriesData: any;
  subCategoriesData: any;
  constructor(
    public commonservice: CommonServiceService,
    public invokeService: InvokeServiceService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    var requestData = {}

    this.invokeService.postMethod("getcategories", requestData).then((response: any) => {
      console.log(response);
      this.categoriesData = response.data;
      
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  catagoriesCheck(data) {
    console.log("catagoriesCheck data", data);
    this.categoriesData.forEach(element => {
      if(data.category_id = element.category_id) {
        if(element.subcategories) {
          console.log("subcategories available");
          this.subCategoriesData = element.subcategories;
        } else {
          console.log("subcategories not available");
        }
      }
    });
  }

}
