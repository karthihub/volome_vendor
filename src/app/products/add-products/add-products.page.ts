import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonServiceService } from '../../service/common-service.service';
import { InvokeServiceService } from '../../service/invoke-service.service';

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
    // "conditionNote": "",
    // "quantity": "",
    // "condition": ""
  }
  constructor(
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public imageCompress: NgxImageCompressService,
    public modalController: ModalController,
    public commonservice: CommonServiceService,
    public invokeService: InvokeServiceService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {

  }

  addProducts() {

    console.log("base64Img---->", this.base64Image);

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
    } else if (!this.req.HSNcode) {
      this.commonservice.presentToastWithButton("Please Enter HSN code");
      return false;
    } else if (!this.req.SKUvalue) {
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
    } else if (!this.req.sellerWarDes) {
      this.commonservice.presentToastWithButton("Please Enter Seller Warranty Description");
      return false;
    } else if (!this.req.saleStartDate) {
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
    } else {
      var requestData = {
        "productid": this.req.productID,
        "category_id": "",
        "name": this.req.productName,
        "brand_name": this.req.brandName,
        "manufacturer": this.req.manufacName,
        "description": this.req.productDescription,
        // "HSNcode": this.req.HSNcode, //

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
        "shipping_weight": this.req.productWeight,
        "featured_image": this.base64Image.length == 1 ? this.base64Image : this.base64Image[0],
        "images": [this.base64Image.length > 0 ? this.base64Image : this.base64Image[0]],
        // "conditionNote": this.req.conditionNote, //
        // "quantity": this.req.quantity, //
        // "condition": this.req.condition //
      }
      console.log("request Date--?", requestData);

      this.invokeService.postMethod("vendor_addnewproduct", requestData).then((response: any) => {
        console.log(response);
        this.commonservice.presentToastWithButton(response.message);
        this.navCtrl.pop();
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
