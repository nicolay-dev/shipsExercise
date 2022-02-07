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
  styleUrls: ['./chart.component.css'],
})

export class ChartComponent implements OnInit, OnDestroy {

  /**List of ships */
  ships = new Array<IShip>();
  getDataServiceSus!: Subscription;
  /**Data charged to the chart */
  dataChart = new Array();
  chart = new Chart();
  chartType = false;

  constructor(private dataService: DataService) {}
  
  getCharType = (): 'line' | 'column' => {
    if (this.chartType){
      return 'line';
    } else {
      return 'column'
  }}
  
  setShips(ship : Array<IShip>) {
    this.ships = ship;
    this.repaintChart(this.dataChart, this.getCharType());
  } 

  ngOnInit(): void {
    this.getDataServiceSus = this.dataService.getShips().subscribe((ships) => {this.ships = ships});
    /* this.initObservables(); */
  }

  /**
   * Switch between columns and lines
   */
  switchType() {
    this.chartType = !this.chartType;
    this.repaintChart(this.dataChart, this.getCharType());
  }

  repaintChart(data : Array<any>, type : 'line' | 'column'): void {
    if(_.first(this.ships)){
      this.loadDataToChart(this.ships);
      this.createChart('Selected Ships', data, type);
    }
  }

  loadDataToChart = (shipsList : Array<IShip>) => {
    _.remove(this.dataChart);
    shipsList.forEach((ship)=>{
      if (ship.check)
        this.dataChart.push({name: _.clone(ship.ship_name), y: ship.weight_lbs * environment.conversionFactor})
    });
  }

  createChart = (name : string, data : Array<any>, type : 'line' | 'column') => {
    this.chart.destroy();
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
          data: data,
          type: type,
        },
      ],
    });
  }

  ngOnDestroy() {
    if (this.getDataServiceSus) {
      this.getDataServiceSus.unsubscribe();
    }
  }
}
