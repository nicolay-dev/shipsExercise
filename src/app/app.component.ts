import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'shipsExercise';
  /**Used to switch between views */
  dashboard = true;

  constructor() {
  }

  isDashboardView(state: boolean){
    this.dashboard = state;
  }
}
