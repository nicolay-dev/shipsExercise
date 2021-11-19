import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private urlApi = 'https://api.spacexdata.com/v3/ships';

  constructor(private http: HttpClient) {}

  getShips(): Observable<any> {
    return this.http.get<any>(this.urlApi + '', {});
  }
}
