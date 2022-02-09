import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**Used to switch between views */

  constructor(private routerNav: Router) { }

  ngOnInit(): void {
  }

  redirect(state: boolean){
    state 
    ? this.routerNav.navigate(['dashboard'])
    : this.routerNav.navigate(['details']);
  }

}
