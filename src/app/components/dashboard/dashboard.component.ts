import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IShip } from 'src/app/models/ship.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

  @Input()  ships:Array<IShip>;

  constructor(){
    this.ships = new Array<IShip>();
  }

  ngOnInit(): void {
  }

  ngOnChanges(){    
  }

}
