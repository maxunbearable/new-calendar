import { Component } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {Observer} from 'rxjs';
import { extendMoment } from 'moment-range';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  moment = extendMoment(moment);

  absenceList!: any[];
  sicknessArr:any[] = [];
  vacationArr:any[] = [];

  constructor(private store: Store<{ absence:any }>) {
    store.select('absence');
  }




  title = 'event-calendar 2021';

  months = [1,2,3,4,5,6,7,8,9,10,11,12];

  absenceFlag = 'false';



   getDaysArrayByMonth(month: number) {
    const year = 2021;
    let daysInMonth = moment(`${year}-${month}`).daysInMonth();
    let arrDays = [];
    let monthNaming = moment(`${year}-${month}`).format("MMM")


    while(daysInMonth) {
      let current = moment(`${year}-${month}`).date(daysInMonth).format('L');
      let dayOfWeek = moment(current).day();
      let dayOfMonth = moment(current).format("DD");
      let monthName = moment(`${year}-${month}`).format("MMM")
      arrDays.push({ monthNaming, month:monthName, day:dayOfMonth, date: current, isweekend: dayOfWeek === 0 || dayOfWeek === 6? true : false  });
      daysInMonth--;

    }
    return arrDays.reverse();
  }

  popoutView = false;
cellClick(){
  this.popoutView = true;
}


  public monthList = this.months.map((month: number) => {

     return this.getDaysArrayByMonth(month);

   });

   absenceType(){

     for (let absence of this.absenceList){
       if (absence.typeOfAbsence === 'vacation'){
          let start = absence.from;
          console.log('start',start)
          let end = absence.to;
          console.log('end',end)
          console.log(start<end)
          console.log('+1day',moment(start).add(1, 'days').format('L'))
          while (start<= end) {
            this.vacationArr.push( moment(start).format('L') )
            start = moment(start).add(1, 'days').format('L');
        }
       }
       if (absence.typeOfAbsence === 'sickness'){
        let start = absence.from;
        console.log('start',start)
        let end = absence.to;
        console.log('end',end)
        console.log(start<end)
        console.log('+1day',moment(start).add(1, 'days').format('L'))
        while (start<= end) {
          this.sicknessArr.push( moment(start).format('L') )
          start = moment(start).add(1, 'days').format('L');
      }
     }
     }
   }


   logStore(){
     this.absenceType();
     console.log(this.vacationArr)

   }


   ngOnInit(){
      this.store.select('absence')
      .subscribe(state => {
        console.log(state)
        this.absenceList = state
      })
   }












}
