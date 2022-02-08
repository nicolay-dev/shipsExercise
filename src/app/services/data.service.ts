import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { IShip } from '../models/ship.model';
@Injectable({
  providedIn: 'root',
})
export class DataService {

  ships$ = new BehaviorSubject(new Array());
  ships = new Array<IShip>();
  apiObservable$ = new Observable<any>();
  checkedShips$ = of(this.ships);

  constructor(private http: HttpClient) {}

  private consumeApi = (url : string) => this.http.get(url + '', {});

  getShips(): Observable<any> {
    return this.consumeApi(environment.urlApi);
    /* apiObservable.subscribe((response : any) => this.ships$.next(_.cloneDeep(response))); */
  }

  filterByType = (ships : Array<any> ,type : string): Array<any> => {
    return _.filter(ships, (ship) => ship.ship_type === type);
  }

  updateCheckedShips(ships : Array<IShip>){
    return this.ships = ships;
  }

  getCheckedShipsO() {
    return this.checkedShips$
  }
}
