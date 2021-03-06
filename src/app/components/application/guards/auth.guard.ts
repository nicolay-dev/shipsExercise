import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/store.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {
  private isLogged = false;
  constructor(private store: Store<{store:AppState}>, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.setLogged();
    if (!this.isLogged) {
      return this.router.navigate(['/login']).then(() => false);
    }return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.setLogged();
    if (!this.isLogged) {
      return this.router.navigate(['/login']).then(() => false);
    }return true;
  }
  
  

  setLogged() {
    this.store.subscribe(state => {
      const user = state.store.loginUser;
      user.username != '' ? this.isLogged = true : this.isLogged = false; 
    });
  }
  
}
