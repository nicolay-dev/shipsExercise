import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IShip } from './models/ship.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  title = 'shipsExercise';
  dashboard = true;
  dataSuscription: Subscription;
  ships = new Array<IShip>();

  constructor(private dataService: DataService) {
    this.dataSuscription = this.dataService.getShips().subscribe((res)=>{
      this.ships = res;      
    });
  }

  isDashboardView(state: boolean){
    this.dashboard = state;
  }

  ngOnDestroy(){
    if (this.dataSuscription) {
      this.dataSuscription.unsubscribe();
    }
  }
}
