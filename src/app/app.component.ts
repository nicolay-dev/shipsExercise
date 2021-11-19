import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'shipsExercise';
  dashboard = true;
  dataSuscription: Subscription;

  constructor(private dataService: DataService) {
    this.dataSuscription = this.dataService.getShips().subscribe((res)=>{
      console.log(res);
    });
  }

  isDashboardView(state: boolean){
    this.dashboard = state;
  }
}
