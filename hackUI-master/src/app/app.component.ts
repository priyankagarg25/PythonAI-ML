import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from './services/chart.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-chart';
  chart: any = [];
 
  constructor(public chartService:ChartService) {}

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.chartService.extractTimeData("published", this.chartService.data) || [],
        datasets: [
          {
            label: 'Impact',
            data: this.chartService.extractData("score", this.chartService.data) || [],
            borderWidth: 1,
            backgroundColor:this.chartService.extractColor("sentiment",this.chartService.data) || []
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              footer: (tooltipItems)=>this.chartService.footer(tooltipItems, this.chartService.data),
            }
          }
        }
      },
    });
  }

 
}
