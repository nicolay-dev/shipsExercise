import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-list-ships',
  templateUrl: './list-ships.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ListShipsComponent implements OnInit,  OnDestroy {

  dataSuscription!: Subscription;
  /**List of ships */
  ships = new Array<IShip>();

  constructor(
    private dataService: DataService,
    private chartComponet: ChartComponent,
    ) {}

  ngOnInit(): void {
    this.initSuscritions();
  }

  initSuscritions() {
    this.dataSuscription = this.dataService.getShips().subscribe((ships) => {this.ships = ships});
  }

  updateSelections(ship:IShip){
    ship.check = !ship.check;
    this.chartComponet.setShips(this.ships);
  }

  updateShipSelected(ship:IShip) {
    _.filter(this.ships, (element) => {
      if(element.ship_id === ship.ship_id) {
        element = ship;
      }
    });
  }

  ngOnDestroy(){
    if (this.dataSuscription) {
      this.dataSuscription.unsubscribe();
    }
  }
}
