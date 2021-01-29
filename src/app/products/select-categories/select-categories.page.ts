import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
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
  public items = [];
  public treeView = false;
  public persistedName = "MyItemsPersisted";
  public treeViewName = "MyItemsTreeView";

  categoriesData = [];
  subCategoriesData: any;
  public catArray = [];
  public subCatArray = [];
  public subCatArrayModel = [];
  public selectedCateg:any;
  public selectedCat_ID:any;
  constructor(
    public commonservice: CommonServiceService,
    public invokeService: InvokeServiceService,
    private navCtrl: NavController,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(() => {
        this.getCategoriesData();
    });
   }

   onSelectedChange(value){
     console.log("onSelectedChange=====>>", value);
   }

   onFilterChange(value){
    console.log("onFilterChange=====>>", value);
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    const ionSelects = document.querySelectorAll('ion-select');
    ionSelects.forEach((sel) => {
      sel.shadowRoot.querySelectorAll('.select-icon-inner')
        .forEach((elem) => {
          elem.setAttribute('style', 'display: none;');
        });
      sel.shadowRoot.querySelectorAll('.select-text')
        .forEach((elem) => {
          elem.setAttribute('style', 'opacity: 1;');
        });
    });
  }

  getCategoriesData(){
    this.items = [];
    // localStorage.setItem('MyItemsPersisted', '');
    this.invokeService.postMethod("getcategories", null).then((response: any) => {
      console.log(response);
      this.categoriesData = response.data;
      this.categoryJson_dropdown(this.categoriesData);
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
  public backFlag = false;
  onChangeTime(){
    if(!this.backFlag){
      this.backFlag = true;
      // setTimeout(() => {
        console.log(localStorage.getItem('MyItemsPersisted'));
        var getID:any =  JSON.parse(localStorage.getItem('MyItemsPersisted'));
        if(getID.items.length > 0){
          console.log(getID.items[getID.items.length - 1]);
            this.getCategoryAttribute(getID.items[getID.items.length - 1]);
        }
      // }, 1000);
    }
  }

  categoryJson(tempData){
    this.items = [];
    for(var i = 0; i < tempData.length; i++)
      {
        var product = tempData[i];
        this.items.push({ 
          "id": tempData[i].category_id,
         "name": tempData[i].category_name
         });
          if(product.subcategories){
              this.subcategories(product.subcategories, tempData[i].category_id);
          }
      }
      this.treeView = true;
  }

  subcategories(product, parentID){
    for(var j = 0; j < product.length; j++)
        {
            var version = product[j];
            this.items.push({ 
              "id": product[j].category_id,
             "name": product[j].category_name,
             "parentId": parentID
             });
            if(version.subcategories){
            this.subcategories(version.subcategories, product[j].category_id);
            }
        }
  }

  getCategoryAttribute(category_id){
    this.commonservice.select_categoryID = category_id;
    this.invokeService.postMethod("category_attributes/"+ category_id , null).then((response: any) => {
      console.log(response);
      // this.backFlag = false;
      // var tempJson = JSON.parse(localStorage.getItem('MyItemsPersisted'));
      // tempJson.items = [];
      // localStorage.setItem('MyItemsPersisted', tempJson.items);
      // if(response.data){
        this.commonservice.select_categoryData = response.data;
        this.router.navigate(['/add-products']);
      // }else{
      //   this.categoryJson(this.categoriesData);
      // }
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  categoryJson_dropdown(tempData){
    this.catArray = [];
    for(var i = 0; i < tempData.length; i++)
      {
        this.catArray.push({ 
          "id": tempData[i].category_id,
         "name": tempData[i].category_name
         });
      }
  }

  subCategoryJson_dropdown(category_id){
    this.selectedCat_ID = category_id;
    console.log(category_id);
    this.subCatArray = [];
    for(var i = 0; i < this.categoriesData.length; i++)
      {
        if(this.categoriesData[i].category_id == category_id){
          if(this.categoriesData[i].hasOwnProperty('subcategories')){
            console.log("subcategories===>>", this.categoriesData[i].subcategories);
            this.getSubcategoriesData(this.categoriesData[i].subcategories);
          }
        }
      }
      setTimeout(() => {
        const ionSelects = document.querySelectorAll('ion-select');
        ionSelects.forEach((sel) => {
          sel.shadowRoot.querySelectorAll('.select-icon-inner')
            .forEach((elem) => {
              elem.setAttribute('style', 'display: none;');
            });
          sel.shadowRoot.querySelectorAll('.select-text')
            .forEach((elem) => {
              elem.setAttribute('style', 'opacity: 1;');
            });
        });
      }, 500);
  }

  getSubcategoriesData(subcategoriesData){
    for(var j = 0; j < subcategoriesData.length; j++){
      this.subCatArray.push({
        placeholder : "Select Sub-Category",
        selectedVal : "",
        options : [{
          "value" : subcategoriesData[j].category_name,
          "category_id" : subcategoriesData[j].category_id
        }],
        subcategories : (subcategoriesData[j].hasOwnProperty('subcategories'))? subcategoriesData[j].subcategories:null
      });
    }
  }

  getSubcategoriesData_1(category_id, categoriesData){
    this.selectedCat_ID = category_id;
    console.log("getSubcategoriesData_1--->",category_id,categoriesData);
    // for(var i = 0; i < categoriesData.length; i++)
    //   {
        // if(categoriesData.category_id == category_id){
          if(categoriesData.subcategories){
            console.log("subcategories===>>", categoriesData.subcategories);
            this.getSubcategoriesData(categoriesData.subcategories);
          }else{
            this.getCategoryAttribute(category_id);
          }
        // }
      // }
      setTimeout(() => {
        const ionSelects = document.querySelectorAll('ion-select');
        ionSelects.forEach((sel) => {
          sel.shadowRoot.querySelectorAll('.select-icon-inner')
            .forEach((elem) => {
              elem.setAttribute('style', 'display: none;');
            });
          sel.shadowRoot.querySelectorAll('.select-text')
            .forEach((elem) => {
              elem.setAttribute('style', 'opacity: 1;');
            });
        });
      }, 500);
  }

}
