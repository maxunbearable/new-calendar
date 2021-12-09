import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

/*import { PopoutComponent } from './popout/popout.component'; */
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {absenceReducer} from './state/calendar.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ absence: absenceReducer}),


    MatSelectModule,




    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

 }

