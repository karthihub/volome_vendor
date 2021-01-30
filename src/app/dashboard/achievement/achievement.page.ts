import { Component, OnInit, ViewChild } from '@angular/core';
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
  SaleChart: any;
  noOfProductChart: any;
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {

    this.revenueChart = new Chart(this.monthlyRevenueChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Revenue',
          data: [500, 1000, 1500, 2000, 2500],
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
        labels: ["Health & Personal Care", "Clothing", "Books", "Grocery & Foods", "Fashion", "Others"],
        datasets: [
          {
            label: "Category Wise Sales",
            data: [12, 19, 3, 5, 2, 3],
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
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'No.of Product Sales',
        data: [500, 1000, 1500, 2000, 2500],
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
