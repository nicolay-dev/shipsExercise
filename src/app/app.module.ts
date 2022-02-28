import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { ChartComponent } from './components/chart/chart.component';
import { ListShipsComponent } from './components/list-ships/list-ships.component';
import { KilogramsPipe } from './pipes/kilograms.pipe';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './components/application/app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoreModule } from '@ngrx/store';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { environment } from 'src/environments/environment';
import * as reducers from 'src/app/components/application/store/user.reducer';
import { RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { DetailsModule } from './components/details/details.module';
import { UserManagerModule } from './components/user-manager/user-manager.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    ChartComponent,
    ListShipsComponent,
    KilogramsPipe,
    LoginComponent,
    HeaderComponent,
    UserManagerComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    DetailsModule,
    UserManagerModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
    RouterModule,
    MatFormFieldModule,
    StoreDevtoolsModule.instrument({}),
    StoreModule.forRoot({ store: reducers.managerUserReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
