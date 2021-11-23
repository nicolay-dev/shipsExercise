import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dataSuscription: Subscription;
  ships = new Array<IShip>();

  constructor(private dataService: DataService) {
    this.dataSuscription = this.dataService.ships$.subscribe((res)=>{
      this.ships = res;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if (this.dataSuscription) {
      this.dataSuscription.unsubscribe();
    }
  }

}
