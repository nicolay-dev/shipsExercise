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

  redirect(state: string){
    switch (state) {
      case 'dashboard':
        this.routerNav.navigate(['dashboard']);
        break;
      case 'details':
        this.routerNav.navigate(['details']);
        break;
      case 'manager':
        this.routerNav.navigate(['manager']);
        break;
      default:
        this.routerNav.navigate(['']);
        break;
    }
  }

}
