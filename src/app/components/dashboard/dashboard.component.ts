import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dataSuscription!: Subscription;
  ships = new Array<IShip>();
  searchResults = new Array<IShip>();
  type = '';
  searchResults$ = new Observable<any>();
  formGroup: FormGroup = this.formBuilder.group({
    searchShip: ['', ],
    selectedOption: [''],
  });

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getShips();
    this.searchResults$ = this.formGroup.valueChanges;
    this.searchResults$.subscribe((value) => {this.searchShip(value)});
  }

  getShips = () => this.dataSuscription = this.dataService.getShips().subscribe((ships) => {
    this.ships = ships;
    this.searchResults = this.ships;
  });

  getTypes = () => { return ['Cargo', 'Barge', 'Tug' , 'High Speed Craft']};

  setShips = ( newShips : Array<IShip>) => {return this.ships = _.cloneDeep(newShips)};

  filterShips = (type : string) => this.searchResults = this.dataService.filterByType(this.ships, type);

  resetFilter = () => this.getShips();  

  searchShip(value : string){
    const newValue = _.get(value, 'searchShip');
    if(newValue){
      this.searchResults = _.filter(this.ships, (element)=> {
        return _.startsWith(_.toLower(element.ship_id) , _.toLower(newValue))
      });
    }else {
      this.searchResults = this.ships;
    }
  }

  onSubmit() {
      this.searchShip(_.get(this.formGroup.value, 'searchShip'));
      /* this.filterShips(_.get(this.formGroup.value, 'selectedOption')); */
  }

  ngOnDestroy(){
    if (this.dataSuscription) {
      this.dataSuscription.unsubscribe();
    }
  }
}

// filtro según propiedad -> OK
// search para buscar por nombre -> OK
// constructor -> OK
// observable -> OK
// Styles
// Actualizar a form reactivo -> OK
// Angular Material -> ok

//(click)="searchShip(this.formGroup.value.searchShip)"
