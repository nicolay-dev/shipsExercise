import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subject} from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  autenticated = new Subject<boolean>();
  loginSuccess$ = this.autenticated.asObservable();
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

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private routerNav: Router
    ) { }

  ngOnInit(): void {
    this.initFormObservable();
  }

  initFormObservable () {
    this.loginSuccess$.subscribe((res) => {
      if(res) {
        this.routerNav.navigate(['dashboard']);
      }else{
        alert('Ingrese datos validos');
      }
    });
  }

  login() {
    this.dataService.getUser(
      _.get(this.formGroup.value, 'username'),
      _.get(this.formGroup.value, 'password')
      ).subscribe((res) => {
        this.autenticated.next(res);
    });;
  }

}
