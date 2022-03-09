import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { AppState } from '../components/application/store/store.reducer';

@Directive({
  selector: '[appAlterText]'
})
export class AlterTextDirective {

  constructor(
    private el: ElementRef, 
    private renderer:Renderer2,
    private store: Store<{store : AppState}>,
    ) {
      this.store.subscribe(state => {
        let loginUser = _.get(state.store, 'loginUser');
        if(loginUser.rol === 'admin'){
          renderer.setStyle(el.nativeElement,'color','#ffd740');
        }
      });
   }

}
