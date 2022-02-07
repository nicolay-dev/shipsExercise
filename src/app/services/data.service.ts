import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class DataService {

  ships$ = new BehaviorSubject(new Array());
  apiObservable = new Observable<any>();

  constructor(private http: HttpClient) {}

  private consumeApi = (url : string) => this.http.get(url + '', {});

  getShips(): Observable<any> {
    return this.consumeApi(environment.urlApi);
    /* apiObservable.subscribe((response : any) => this.ships$.next(_.cloneDeep(response))); */
  }

  filterByType = (ships : Array<any> ,type : string): Array<any> => {
    return _.filter(ships, (ship) => ship.ship_type === type);
  }
}
