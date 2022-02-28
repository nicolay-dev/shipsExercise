import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { User } from 'src/app/models/user.model';
import * as addUserActions from '../application/store/user.actions';
import { AppState } from '../application/store/user.reducer';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  users!: User[];
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
    private store: Store<{store:AppState}>
  ) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.users = [...(_.get(state.store, 'userList'))];
    });
  }

  agregarUsuario(){
    this.store.dispatch(
      addUserActions.addUser({
        user: {
          username: _.get(this.formGroup.value, 'username'),
          password: _.get(this.formGroup.value, 'password'),
        },
      })
    );
    this.routerNav.navigate(['manager']);
  }

  deleteUser (user : User) {
    this.store.dispatch(addUserActions.deleteUser({user: user}));
    this.routerNav.navigate(['manager']);
  }

}
