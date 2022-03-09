import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from '../application/store/store.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as loginActions from '../application/store/store.actions';
import * as _ from 'lodash';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUser: User = {username : '', password : '', rol : ''};

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
      if(this.loginUser.username != ''){
        this.routerNav.navigate(['dashboard']);
      }
    });
  }

  login() {
    this.store.dispatch(loginActions.loginAction({
        user: {
          username: _.get(this.formGroup.value, 'username'),
          password: _.get(this.formGroup.value, 'password'),
          rol: ''
      }
    }));
  }

}
