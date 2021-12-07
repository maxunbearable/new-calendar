import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import { interval, timer, fromEvent, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../counter.actions';
import { addAbsence } from '../state/calendar.actions';





@Component({
  selector: 'app-popout',
  templateUrl: './popout.component.html',
  styleUrls: ['./popout.component.scss']
})
export class PopoutComponent implements OnInit {
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
  adsenceList:any[] = [];


  absenceList$: Observable<any[]>;

  constructor(private store: Store<{ absence:any }>) {
    this.absenceList$ = store.select('absence');
  }

  addAbsence() {
    // TODO: Dispatch an increment action
    this.store.dispatch(addAbsence({from:this.startValue,to:this.endValue,abcenseType:this.typeOfAbsenceValue }));
    console.log(this.adsenceList)
  }



  popoutView = true;

  cancelClick(){
    this.popoutView = false;
  }
  requestClick(){
    this.startValue = moment(this.timeSpan.value.startDate).format("L");
    this.endValue = moment(this.timeSpan.value.endDate).format("L");
    this.typeOfAbsenceValue = this.timeSpan.value.typeOfAbsence;
    this.adsenceList.push({typeOfAbsence:this.typeOfAbsenceValue, from:this.startValue, to:this.endValue })
    console.log(this.adsenceList)
  }


  ngOnInit(): void {
/*
    let interval$ = timer(3000, 1000);
    interval$.subscribe(val => console.log("stream 1 => "+val));
    const  click$ = fromEvent(document, 'click');
    click$.subscribe(evt => console.log(evt)); */

  }

}
