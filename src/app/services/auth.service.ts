import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login: boolean = false;

  constructor() { }

  isLogin():boolean {return this.login}

  setLogin(isSuccesLogin : boolean){this.login = isSuccesLogin}
}
