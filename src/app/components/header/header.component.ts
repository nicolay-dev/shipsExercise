import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { AppState } from '../application/store/store.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**Used to switch between views */
  rol = ''

  constructor(
    private routerNav: Router,
    private store: Store<{store : AppState}>,
    ) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.rol = _.get(state.store.loginUser, 'rol');
    });
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
