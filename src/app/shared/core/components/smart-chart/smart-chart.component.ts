import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Colors } from 'chart.js';


@Component({
  selector: 'app-smart-chart',
  templateUrl: './smart-chart.component.html',
  styleUrls: ['./smart-chart.component.css']
})
export class SmartChartComponent  implements OnInit {
  public chart: any;
  @Input('type') type :  any = 'bar';
  @Input('smartConfig') smartConfig : any = {};
  @Input('chartName') chartName : any = "smartChart"
  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.createChart();
    },0)
  }

  createChart(){  
    this.chart = new Chart(this.chartName, {
      type: this.type, 
      data: {
        labels: this.smartConfig.labels, 
	       datasets: [
          {
            label: "Sales",
            data:this.smartConfig.data,
          }, 
        ]
      },
      options: {
        responsive:true,
        aspectRatio:2.5
      }
    });
    Chart.register(Colors)
  }
}
