import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonServiceService } from '../../service/common-service.service';
import { InvokeServiceService } from '../../service/invoke-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {
  public base64Image = [];
  req: any = {
    "productID": "",
    "productName": "",
    "brandName": "",
    "manufacName": "",
    "productDescription": "",
    "HSNcode": "",
    "SKUvalue": "",
    "countryOfOrigin": "",
    "mrp": "",
    "sellerPrice": "",
    "sellerWarDes": "",
    "salePrice": "",
    "saleStartDate": "",
    "endDate": "",
    "ProductDimensionLength": "",
    "ProductDimensionLengthUnit": "",
    "ProductDimensionWidth": "",
    "ProductDimensionWidthUnit": "",
    "ProductDimensionHeight": "",
    "ProductDimensionHeightUnit": "",
    "PackageDimensionLength": "",
    "PackageDimensionLengthUnit": "",
    "PackageDimensionWidth": "",
    "PackageDimensionWidthUnit": "",
    "PackageDimensionHeight": "",
    "packageDimensionHeightUnit": "",
    "productWeight": "",
    "productWeightUnit": "",
    "available_stock": "",
    "category_attr": ""
    // "conditionNote": "",
    // "quantity": "",
    // "condition": ""
  }
  public category_data = [];
  public qtd:any = {};
  constructor(
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public imageCompress: NgxImageCompressService,
    public modalController: ModalController,
    public commonservice: CommonServiceService,
    public invokeService: InvokeServiceService,
    private navCtrl: NavController,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.category_data = this.commonservice.select_categoryData;
    console.log("category_data", this.category_data);

    if(this.commonservice.isEditProduct){
    this.req.productID = this.commonservice.getProductInfo.product_id;
    this.req.productName = this.commonservice.getProductInfo.name;
    this.req.brandName = this.commonservice.getProductInfo.brand_name;
    this.req.manufacName = this.commonservice.getProductInfo.manufacturer;
    this.req.productDescription = this.commonservice.getProductInfo.description;
    // this.req.HSNcode = this.commonservice.getProductInfo.
    this.req.SKUvalue = this.commonservice.getProductInfo.sku;
    this.req.countryOfOrigin = this.commonservice.getProductInfo.country_of_origin;
    this.req.mrp = this.commonservice.getProductInfo.mrp;
    this.req.sellerPrice = this.commonservice.getProductInfo.seller_price;
    // this.req.sellerWarDes = this.commonservice.getProductInfo.
    this.req.salePrice = this.commonservice.getProductInfo.sales_price;
    this.req.saleStartDate = this.commonservice.getProductInfo.sales_start_date;
    this.req.endDate = this.commonservice.getProductInfo.sales_end_date;
    this.req.ProductDimensionLength = this.commonservice.getProductInfo.product_dimensions.Length.size;
    this.req.ProductDimensionLengthUnit = this.commonservice.getProductInfo.product_dimensions.Length.unit;
    this.req.ProductDimensionWidth = this.commonservice.getProductInfo.product_dimensions.Width.size;
    this.req.ProductDimensionWidthUnit = this.commonservice.getProductInfo.product_dimensions.Width.unit;
    this.req.ProductDimensionHeight = this.commonservice.getProductInfo.product_dimensions.Height.size;
    this.req.ProductDimensionHeightUnit = this.commonservice.getProductInfo.product_dimensions.Height.unit;
    this.req.PackageDimensionLength = this.commonservice.getProductInfo.package_dimension.Length.size;
    this.req.PackageDimensionLengthUnit = this.commonservice.getProductInfo.package_dimension.Length.unit;
    this.req.PackageDimensionWidth = this.commonservice.getProductInfo.package_dimension.Width.size;
    this.req.PackageDimensionWidthUnit = this.commonservice.getProductInfo.package_dimension.Width.unit;
    this.req.PackageDimensionHeight = this.commonservice.getProductInfo.package_dimension.Height.size;
    this.req.packageDimensionHeightUnit = this.commonservice.getProductInfo.package_dimension.Height.unit;
    this.req.productWeight = this.commonservice.getProductInfo.shipping_weight.split(" ")[0];
    this.req.productWeightUnit = this.commonservice.getProductInfo.shipping_weight.split(" ")[1];
    // this.req.available_stock = "";
    // this.req.category_attr = this.commonservice.getProductInfo.
    this.base64Image = this.commonservice.getProductInfo.image;
    this.commonservice.select_categoryID = this.commonservice.getProductInfo.category_id;

    var attributes = Object.values(this.commonservice.getProductInfo.attributes);
      for(let i=0; i<this.category_data.length; i++){
        this.qtd[i] = attributes[i];
      }
    }
  }

  addProducts() {

    console.log("base64Img---->", this.base64Image);
    console.log("req.category_data", this.req.category_attr);
    if (!this.req.productID) {
      this.commonservice.presentToastWithButton("Please Enter Product ID");
      return false;
    } if (!this.req.productName) {
      this.commonservice.presentToastWithButton("Please Enter Product Name");
      return false;
    } else if (!this.req.brandName) {
      this.commonservice.presentToastWithButton("Please Enter Brand Name");
      return false;
    } else if (!this.req.manufacName) {
      this.commonservice.presentToastWithButton("Please Enter Manufacturer Name");
      return false;
    } else if (!this.req.productDescription) {
      this.commonservice.presentToastWithButton("Please Enter Product Description");
      return false;
    } 
    
    // else if (!this.req.HSNcode) {
    //   this.commonservice.presentToastWithButton("Please Enter HSN code");
    //   return false;
    // } 
    
    else if (!this.req.SKUvalue) {
      this.commonservice.presentToastWithButton("Please Enter SKU Value");
      return false;
    } else if (!this.req.countryOfOrigin) {
      this.commonservice.presentToastWithButton("Please Enter Country of Origin");
      return false;
    } else if (!this.req.mrp) {
      this.commonservice.presentToastWithButton("Please Enter MRP");
      return false;
    } else if (!this.req.sellerPrice) {
      this.commonservice.presentToastWithButton("Please Enter Seller Price");
      return false;
    } 
    
    // else if (!this.req.sellerWarDes) {
    //   this.commonservice.presentToastWithButton("Please Enter Seller Warranty Description");
    //   return false;
    // } 
    
    else if (!this.req.saleStartDate) {
      this.commonservice.presentToastWithButton("Please Enter Sale Start Date");
      return false;
    } else if (!this.req.endDate) {
      this.commonservice.presentToastWithButton("Please Enter End Date");
      return false;
    } else if (!this.req.ProductDimensionLength) {
      this.commonservice.presentToastWithButton("Please Enter Product Dimension Length");
      return false;
    } else if (!this.req.ProductDimensionLengthUnit) {
      this.commonservice.presentToastWithButton("Please Select Product Dimension Length Unit");
      return false;
    } else if (!this.req.ProductDimensionWidth) {
      this.commonservice.presentToastWithButton("Please Enter Product Dimension Width");
      return false;
    } else if (!this.req.ProductDimensionWidthUnit) {
      this.commonservice.presentToastWithButton("Please Select Product Dimension Width Unit");
      return false;
    } else if (!this.req.ProductDimensionHeight) {
      this.commonservice.presentToastWithButton("Please Enter Product Dimension Height");
      return false;
    } else if (!this.req.ProductDimensionHeightUnit) {
      this.commonservice.presentToastWithButton("Please Select Product Dimension Height Unit");
      return false;
    } else if (!this.req.PackageDimensionLength) {
      this.commonservice.presentToastWithButton("Please Enter Package Dimension Legnth");
      return false;
    } else if (!this.req.PackageDimensionLengthUnit) {
      this.commonservice.presentToastWithButton("Please Select Package Dimension Length Unit");
      return false;
    } else if (!this.req.PackageDimensionWidth) {
      this.commonservice.presentToastWithButton("Please Enter Package Dimension Width");
      return false;
    } else if (!this.req.PackageDimensionWidthUnit) {
      this.commonservice.presentToastWithButton("Please Select Package Dimension Length Unit");
      return false;
    } else if (!this.req.PackageDimensionHeight) {
      this.commonservice.presentToastWithButton("Please Enter Package Dimension Height");
      return false;
    } else if (!this.req.packageDimensionHeightUnit) {
      this.commonservice.presentToastWithButton("Please Select Package Dimension Height Unit");
      return false;
    } else if (!this.req.productWeight) {
      this.commonservice.presentToastWithButton("Please Enter Product Weight");
      return false;
    } else if (!this.req.productWeightUnit) {
      this.commonservice.presentToastWithButton("Please Select Product Weight Unit");
      return false;

      // else if (!this.req.conditionNote) {
      //   this.commonservice.presentToastWithButton("Please Enter Condition Note");
      //   return false;
      // } else if (!this.req.quantity) {
      //   this.commonservice.presentToastWithButton("Please Select Quantity");
      //   return false;
      // } else if (!this.req.condition) {
      //   this.commonservice.presentToastWithButton("Please Enter Condition");
      //   return false;
    } else if(this.req.mrp < this.req.sellerPrice){
      this.commonservice.presentToastWithButton("Seller Price should be equal or lesser than MRP");
      return false;
    } else if(this.req.sellerPrice < this.req.salePrice){
      this.commonservice.presentToastWithButton("Sales Price should be equal or lesser than Seller Price");
      return false;
    } 
    
    // else if (!this.req.available_stock) {
    //   this.commonservice.presentToastWithButton("Please Enter Available Stock");
    //   return false;
    // } 
    
    else {
      console.log("this.qtd---->", this.qtd);
      var tempAttributes = [];
      var featured_image = "";
      for(let i=0; i<this.category_data.length; i++){
        tempAttributes.push({
          "attribute_id": this.category_data[i].attribute_id,
          "value":this.qtd[i]
        });
      }

      var tempprofileData = this.base64Image;
      

      for(let i=0; i<tempprofileData.length; i++){
        var findValue = tempprofileData[i].indexOf("demo.moziztech.com");
        if(findValue == "-1"){
          var data = tempprofileData[i].split(",");
          tempprofileData[i] =  data[1];
        }
      }

      featured_image = tempprofileData[0];


      var requestData = {
        "productid": this.req.productID,
        "category_id": this.commonservice.select_categoryID,
        "name": this.req.productName,
        "brand_name": this.req.brandName,
        "manufacturer": this.req.manufacName,
        "description": this.req.productDescription,
        // "HSNcode": this.req.HSNcode, //

        // "available_stock": this.req.available_stock,
        "sku": this.req.SKUvalue,
        "country_of_origin": this.req.countryOfOrigin,
        "seller_price": this.req.sellerPrice,

        // "sellerWarDes": this.req.sellerWarDes, //
        "mrp": this.req.mrp,
        "sales_price": this.req.salePrice,
        "sales_start_date": this.req.saleStartDate,
        "sales_end_date": this.req.endDate,
        "product_dimensions": {
          "Length": { "size": this.req.ProductDimensionLength, "unit": this.req.ProductDimensionLengthUnit },
          "Width": { "size": this.req.ProductDimensionWidth, "unit": this.req.ProductDimensionWidthUnit },
          "Height": { "size": this.req.ProductDimensionHeight, "unit": this.req.ProductDimensionHeightUnit }
        },
        "package_dimension": {
          "Length": { "size": this.req.PackageDimensionLength, "unit": this.req.PackageDimensionLengthUnit },
          "Width": { "size": this.req.PackageDimensionWidth, "unit": this.req.PackageDimensionWidthUnit },
          "Height": { "size": this.req.PackageDimensionHeight, "unit": this.req.packageDimensionHeightUnit }
        },
        "shipping_weight": this.req.productWeight +" "+ this.req.productWeightUnit,
        "featured_image": featured_image,
        "images": (tempprofileData.length > 0 ? tempprofileData : tempprofileData[0]),
        // "conditionNote": this.req.conditionNote, //
        // "quantity": this.req.quantity, //
        // "condition": this.req.condition //
        "product_attributes": tempAttributes
      }
      console.log("request Date--?", requestData);

      var serviceName = (this.commonservice.isEditProduct)?"vendor_updateproduct/"+this.commonservice.getProductInfo.product_id:"vendor_addnewproduct";

      this.invokeService.postMethod(serviceName, requestData).then((response: any) => {
        console.log(response);
        this.commonservice.presentToastWithButton(response.message);
        // this.navCtrl.pop();
        this.commonservice.isEditProduct = false;
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        this.commonservice.presentToastWithButton(err);
        console.log(err);
      });
    }

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


  pickImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 70,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 344,
      targetHeight: 257
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
        // this.base64Image = [];
        this.base64Image.push(base64);
      }
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  compressFile(srcImage: string) {
    console.log('Size in bytes was:', this.imageCompress.byteCount(srcImage));
    this.imageCompress.compressFile(srcImage, 1, 50, 50).then(
      result => {
        console.log('Size in bytes now:', this.imageCompress.byteCount(result));
        console.log(result);
        // this.profileimg = result;
        // this.base64Image = this.profileimg;
        // this.base64Image = [];
        this.base64Image.push(result);
      });
  }

  closeThisPage() {
    this.modalController.dismiss();
  }

  deletePhoto(val) {
    this.base64Image.splice(val, 1);
  }

}
