/*import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import { interval, timer, fromEvent, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addAbsence } from '../state/calendar.actions';





@Component({
  selector: 'app-popout',
  templateUrl: './popout.component.html',
  styleUrls: ['./popout.component.scss']
})
export class PopoutComponent {
  startValue:any = '';
  endValue:any = '';
  typeOfAbsenceValue:any = '';
  numOfDaysFromStart: any = '';
  numOfDaysToEnd: any = '';
  timeSpan = new FormGroup({
  startDate : new FormControl(''),
  endDate : new FormControl(''),
  typeOfAbsence: new FormControl('')


  })

  constructor(private store: Store<{ absence:any }>) {}

  popoutView = true;

  cancelClick(){
    this.popoutView = false;
  }
  requestClick(){
    this.startValue = moment(this.timeSpan.value.startDate).format("L");
    this.endValue = moment(this.timeSpan.value.endDate).format("L");
    this.typeOfAbsenceValue = this.timeSpan.value.typeOfAbsence;

    this.store.dispatch(addAbsence({
      from:this.startValue,
      to:this.endValue,
      typeOfAbsence:this.typeOfAbsenceValue
    }));

  }

} */
