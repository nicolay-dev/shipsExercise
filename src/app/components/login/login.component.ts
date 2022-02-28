import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, of, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from '../application/store/user.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as loginActions from '../application/store/user.actions';
import * as _ from 'lodash';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUser: User = {username : '', password : ''};

  formGroup: FormGroup = this.formBuilder.group({
    username: ['', [
      Validators.required, 
      Validators.pattern("[a-zA-Z ]*")
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  });

  constructor(
    private routerNav: Router,
    private formBuilder: FormBuilder,
    private store: Store<{store : AppState}>,
    ) {}

  ngOnInit(): void {
    this.initObs();
  }

  initObs () {
    this.store.subscribe(state => {
      this.loginUser = _.get(state.store, 'loginUser');
      console.log(state);
      if(this.loginUser.username != ''){
        this.routerNav.navigate(['dashboard']);
      }
    });
  }

  login() {
    this.store.dispatch(loginActions.loginAction({
        user: {username: _.get(this.formGroup.value, 'username'),
        password: _.get(this.formGroup.value, 'password')}
    }));
  }

}
