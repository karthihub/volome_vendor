import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { InvokeServiceService } from 'src/app/service/invoke-service.service';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http'
import { Chart } from 'chart.js';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage implements OnInit {
  @ViewChild('monthlyRevenueChart') monthlyRevenueChart;
  @ViewChild('SalesChart') SalesChart;
  @ViewChild('productSalesChart') productSalesChart;

  revenueChart: any;
  revenueChartLabelData = [];
  revenueChartValueData = [];
  SaleChart: any;
  SaleChartLabelData = [];
  SaleChartValueData = [];
  noOfProductChart: any;
  noOfProductChartLabelData = [];
  noOfProductChartValueData = [];
  vendorName = "";
  vendorID = "";
  vendorImage = "../../assets/images/deliveryboy_icon.png";
  constructor(public router: Router,public invokeService: InvokeServiceService,
    public commonservice: CommonServiceService,private appComponent: AppComponent,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.vendorImage = (this.commonservice.profileDetails.shop_logo)?this.commonservice.profileDetails.shop_logo:"../../assets/images/deliveryboy_icon.png";
    this.vendorName = (this.commonservice.profileDetails.full_name)?this.commonservice.profileDetails.full_name:"";
    this.vendorID = this.commonservice.user_id;
  }

  ionViewDidEnter() {

    this.invokeService.postMethod("vendor_achievements",null).then((response: any) => {
      console.log(response);
      for(let revenue=0; revenue<response.monthlyrevenue_data.length; revenue++){
        this.revenueChartLabelData.push(response.monthlyrevenue_data[revenue].month);
        this.revenueChartValueData.push(parseInt(response.monthlyrevenue_data[revenue].amount));
      }
      for(let Sale=0; Sale<response.monthlysales_data.length; Sale++){
        this.SaleChartLabelData.push(response.monthlysales_data[Sale].month);
        this.SaleChartValueData.push(parseInt(response.monthlysales_data[Sale].orders));
      }
      for(let product=0; product<response.category_data.length; product++){
        this.noOfProductChartLabelData.push(response.category_data[product].category);
        this.noOfProductChartValueData.push(parseInt(response.category_data[product].sales));
      }
      setTimeout(() => {
        this.createBarChart();
      }, 200);
    }).catch((err) => {
      this.commonservice.presentToastWithButton(err);
      console.log(err);
    });
  }

  createBarChart() {

    this.revenueChart = new Chart(this.monthlyRevenueChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.revenueChartLabelData,
        datasets: [{
          label: 'Monthly Revenue',
          data: this.revenueChartValueData,
          backgroundColor: '#ff8635', // array should have same number of elements as number of dataset
          borderColor: '#ff8635',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.SaleChart = new Chart(this.SalesChart.nativeElement, {
      type: "pie",
      data: {
        labels:  this.SaleChartLabelData,
        datasets: [
          {
            label: "Category Wise Sales",
            data:  this.SaleChartValueData,
            backgroundColor: [
              "#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"
            ],
            hoverBackgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"]
          }
        ]
      }
    });

    let productsData = {
      labels: this.noOfProductChartLabelData,
      datasets: [{
        label: 'No.of Product Sales',
        data: this.noOfProductChartValueData,
        backgroundColor: '#ff8635', // array should have same number of elements as number of dataset
        borderColor: '#ff8635',// array should have same number of elements as number of dataset
        borderWidth: 1
      }]
    }

    this.noOfProductChart = new Chart(this.productSalesChart.nativeElement, {
      type: 'bar',
      data: productsData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
