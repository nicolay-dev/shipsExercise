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
  filterType$ = new Observable<any>();
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
    this.initObservables();
  }

  initObservables() {
    this.searchResults$ = this.formGroup.valueChanges;
    this.filterType$ = this.formGroup.valueChanges;
    this.searchResults$.subscribe((value) => {this.filterShips(value)});
  }

  getShips = () => this.dataSuscription = this.dataService.getShips().subscribe((ships) => {
    this.ships = ships;
    this.searchResults = this.ships;
  });

  getTypes = () => { return ['--Seleccionar--','Cargo', 'Barge', 'Tug' , 'High Speed Craft']};

  filterShips(value : string){
    const searchValue = _.get(value, 'searchShip');
    const filtervalue = _.get(value, 'selectedOption');
    const isSearch = searchValue !== '';
    const isFilter = filtervalue !== '';
    if (isSearch) {
      this.searchShips(searchValue);
    } else if (isFilter) {
      filtervalue === '--Seleccionar--' ? this.searchResults = this.ships : this.filterByType(filtervalue);
    } else if (!isSearch && !isFilter) {
      this.searchResults = this.ships;
    }
  }

  filterByType = (type : string) => {
    this.searchResults = this.dataService.filterByType(this.ships, type);
  }

  searchShips (value : string) {
      this.searchResults = _.filter(this.ships, (element) => {
        return _.startsWith(_.toLower(element.ship_id), _.toLower(value));
      });
  }

  resetFilter = () => {
    this.searchResults = this.ships;
    _.set(this.formGroup.value, 'selectedOption', '--Seleccionar--');
  }

  ngOnDestroy(){
    if (this.dataSuscription) {
      this.dataSuscription.unsubscribe();
    }
  }
}

/* 

filtro según propiedad -> OK
search para buscar por nombre -> OK
constructor -> OK
observable -> OK
Styles -> OK
Actualizar a form reactivo -> OK
Angular Material -> OK

operador ternario -> OK
quitar ngModel -> OK

arreglar segunda visita ?
material en segunda vista -> OK
login -> OK

agregar autentication para navegación guards -> OK 
componente para crear usuarios -> OK
validaión usuario -> OK
libreria ngrx -> store -> OK

proponer cosas para repasar conceptos
repasar directivas perzonalizadas
unitTest ?


rutas hijas del login OK
selector para traer la lista 
directiva custom (estructural) para seleccionar tipo de usuario mostrar o ocultar cosas
directivas de atributo (comportamiento) -> cambiar color de texto segun rol

repasar funcinamiento servicios
typescript generics
rest operator

 */