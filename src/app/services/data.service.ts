import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IShip } from '../models/ship.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  ships$ = new BehaviorSubject<Array<IShip>>(new Array());

  constructor(private http: HttpClient) {
    this.getShips();
  }

  private getShips(): void {
    this.http.get<Array<IShip>>(environment.urlApi + '', {}).subscribe((response)=>{
      this.ships$.next(response);
    });
  }
}
