import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { IShip } from 'src/app/models/ship.model';
import { DataService } from 'src/app/services/data.service';
import { getShipList } from '../application/store/ships.selector';
import * as loginActions from '../application/store/store.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dataSuscription!: Subscription;
  ships = new Array<IShip>();
  ships$ = new Observable<Array<IShip>>();
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
    private formBuilder: FormBuilder,
    private store: Store<{store : AppState}>,

  ) {}

  ngOnInit(): void {
    this.loadShips();
    this.initObservables();
  }

  initObservables() {
    this.searchResults$ = this.formGroup.valueChanges;
    this.filterType$ = this.formGroup.valueChanges;
    this.searchResults$.subscribe((value) => {this.filterShips(value)});
  }

  loadShips = () => this.dataSuscription = this.dataService.getShips().subscribe((ships) => {
    this.store.dispatch(loginActions.loadShips({shipList: ships}));
    this.ships$ = this.store.select(getShipList);
    this.ships$.subscribe((data) => {
      this.ships = data
      this.searchResults = data
    });
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

selector para traer la lista 

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
directiva custom (estructural) para seleccionar tipo de usuario mostrar o ocultar cosas OK
directivas de atributo (comportamiento) -> cambiar color de texto segun rol OK

ngrx tiene selectores, entonces hacer un selector que te traiga la info de los barcos
revisar más sobre rutas

función logout?
servicio de autenticación con token?

repasar funcinamiento servicios
typescript generics

rest operator OK

 */