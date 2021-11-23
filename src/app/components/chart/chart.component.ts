import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subscription } from 'rxjs';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {

  /**List of ships */
  ships = new Array<IShip>();
  dataServiceSuscription: Subscription;
  /**Data charged to the chart */
  dataChart: Array<{}>;
  chart: Chart;
  chartType: 'line' | 'column';

  constructor(private dataService: DataService) {
    this.chartType = 'column';
    this.dataChart = new Array();

    this.chart = new Chart();

    this.dataServiceSuscription = this.dataService.ships$.subscribe((res) => {
      this.ships = res;
      this.repaint();
    });
    
  }
  
  ngOnInit(): void {}

  /**
   * Switch between columns and lines
   */
  switchType() {
    this.chartType === 'line' ? this.chartType = 'column' : this.chartType = 'line';
    this.repaint();
  }

  repaint(): void {
    if(this.ships[0]){
      this.dataChart = new Array();
      
      this.ships.forEach((ship)=>{
        ship.check
        ? this.dataChart.push({name: ship.ship_name, y: ship.weight_lbs * environment.conversionFactor})
        : null;
      });

      this.chart.destroy();
      this.chart = new Chart({
        chart: {
          type: 'line',
        },
        title: {
          text: 'Ships',
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
              text: 'Weight in Kg'
          }
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: 'Selected Ships',
            data: this.dataChart,
            type: this.chartType,
          },
        ],
      });
    }
  }

  ngOnDestroy() {
    if (this.dataServiceSuscription) {
      this.dataServiceSuscription.unsubscribe();
    }
  }
}
