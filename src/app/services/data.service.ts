import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IShip } from '../models/ship.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private urlApi = 'https://api.spacexdata.com/v3/ships';
  private urlApi = 'https://ships2.free.beeceptor.com/';

  constructor(private http: HttpClient) {}

  getShips(): Observable<Array<IShip>> {
    return this.http.get<Array<IShip>>(this.urlApi + '', {});
  }
}
