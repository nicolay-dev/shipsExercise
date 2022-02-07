import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dataSuscription!: Subscription;
  ships = new Array<IShip>();
  type = '';
  searchResults = ''
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
    /* this.searchResults$ = this.formGroup.valueChanges
      .pipe(
        switchMap(searchString => this.searchService.search(searchString))
      ) */
  }

  getShips = () => this.dataSuscription = this.dataService.getShips().subscribe((ships) => {this.ships = ships});

  getTypes = () => { return ['Cargo', 'Barge', 'Tug' , 'High Speed Craft']};

  setShips = ( newShips : Array<IShip>) => {return this.ships = _.cloneDeep(newShips)};

  filterShips = (type : string) => this.ships = this.dataService.filterByType(this.ships, type);

  resetFilter = () => this.getShips();  

  searchShip(value : string){
    this.ships = _.filter(this.ships, (element)=> {
      return _.lowerCase(element.ship_id) === _.lowerCase(value)
    });
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
