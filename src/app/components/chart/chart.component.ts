import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subscription } from 'rxjs';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})

export class ChartComponent implements OnInit, OnDestroy {

  /**List of ships */
  ships = new Array<IShip>();
  getDataServiceSus!: Subscription;
  getCheckedShipsSus!: Subscription;
  /**Data charged to the chart */
  dataChart = new Array();
  chart = new Chart();
  chartType = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chart = new Chart();
    this.getDataServiceSus = this.dataService.getShips().subscribe((ships) => {
      this.ships = ships;
      this.createChart('Ships', 'column');
      this.repaintChart('column', true);
    });
    this.getCheckedShipsSus = this.dataService.getCheckedShipsO().subscribe((shipsChecked) => {
      this.ships = shipsChecked;
      this.repaintChart(this.getCharType(), false);
    })
  }

  getCharType = (): 'line' | 'column' => {
    if (this.chartType){
      return 'line';
    } else {
      return 'column'
  }}

  repaintChart(type : 'line' | 'column', isAllShips? : boolean): void {
    if(_.first(this.ships)){
      this.loadDataToChart(this.ships, isAllShips);
      this.updateChart('Selected Ships', type);
    }
  }

  loadDataToChart = (shipsList : Array<IShip>, allShips? : boolean) => {
    _.remove(this.dataChart);
    shipsList.forEach((ship)=>{
      if (allShips) {
        this.dataChart.push({name: _.clone(ship.ship_name), y: ship.weight_lbs * environment.conversionFactor})
      }else if (ship.check) {
          this.dataChart.push({name: _.clone(ship.ship_name), y: ship.weight_lbs * environment.conversionFactor})
      }
    });
  }

  createChart = (name : string, type : 'line' | 'column') => {
    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Ships',
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        title: {
          text: 'Weight in Kg',
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}Kg',
          },
        },
      },
      series: [
        {
          name: name,
          data: this.dataChart,
          type: type,
        },
      ],
    });
  }

  updateChart (name:string, type : 'line' | 'column') {
    _.set(this.chart, 'series', [{
      name: name,
      data: this.dataChart,
      type: type,
    }]);
  }

  switchType() {
    this.chartType = !this.chartType;
    this.repaintChart(this.getCharType(), false);
  }

  ngOnDestroy() {
    if (this.getDataServiceSus) {
      this.getDataServiceSus.unsubscribe();
    }
  }
}
