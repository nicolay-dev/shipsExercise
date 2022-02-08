import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'shipsExercise';
  /**Used to switch between views */
  dashboard = true;

  constructor() { }

  ngOnInit(): void {
  }

  isDashboardView(state: boolean){
    this.dashboard = state;
  }

}
