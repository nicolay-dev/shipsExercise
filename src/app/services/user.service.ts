import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store: Store<any>) { }

  /* public addPaymentMethod(newAddUserMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.addPaymentMethod({
        newPaymentMethod: { ...newPaymentMethod }
      })
    );
  } */
}
