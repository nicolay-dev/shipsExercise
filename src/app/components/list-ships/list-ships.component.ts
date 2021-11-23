import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-ships',
  templateUrl: './list-ships.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ListShipsComponent implements OnInit,  OnDestroy {

  dataSuscription: Subscription;
  /**List of ships */
  ships = new Array<IShip>();

  constructor(private dataService: DataService) {
    this.dataSuscription = this.dataService.ships$.subscribe((res)=>{
      this.ships = res;
    });
  }

  ngOnInit(): void {
  }

  onChange(ship:IShip){
    ship.check = !ship.check;
    this.dataService.ships$.next(this.ships);
  }

  ngOnDestroy(){
    if (this.dataSuscription) {
      this.dataSuscription.unsubscribe();
    }
  }


}
