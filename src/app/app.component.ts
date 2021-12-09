import { Component } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { CalendarService } from './popout/calendar-service';
import { FormControl, FormGroup } from '@angular/forms';
import { addAbsence } from './state/calendar.actions';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  closeResult = '';
  date = '1/1/1111';

  [x: string]: any;
  startValue: any = '';
  endValue: any = '';
  typeOfAbsenceValue: any = '';
  numOfDaysFromStart: any = '';
  numOfDaysToEnd: any = '';
  timeSpan = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    typeOfAbsence: new FormControl('')
  });

  absenceList!: any[];
  sicknessArr: any[] = [];
  vacationArr: any[] = [];
  popoutView = false;

  constructor(
    private store: Store<{ absence: any }>,
    calendarService: CalendarService,
    private modalService: NgbModal
  ) {
    store.select('absence');
  }

  title = 'event-calendar 2021';

  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];



  getDaysArrayByMonth(month: number) {
    const year = 2021;
    let daysInMonth = moment(`${year}-${month}`).daysInMonth();
    let arrDays = [];
    let monthNaming = moment(`${year}-${month}`).format('MMM');

    while (daysInMonth) {
      let current = moment(`${year}-${month}`)
        .date(daysInMonth)
        .format('L');
      let dayOfWeek = moment(current).day();
      let dayOfMonth = moment(current).format('DD');
      let monthName = moment(`${year}-${month}`).format('MMM');
      arrDays.push({
        monthNaming,
        month: monthName,
        day: dayOfMonth,
        date: current,
        isweekend: dayOfWeek === 0 || dayOfWeek === 6 ? true : false
      });
      daysInMonth--;
    }
    return arrDays.reverse();
  }

  cellClick(value: any) {
    this.popoutView = true;
    moment(value);
    this.timeSpan.patchValue({
      startDate: new Date(value)
    });
  }

  public monthList = this.months.map((month: number) => {
    return this.getDaysArrayByMonth(month);
  });

  absenceType() {
    for (let absence of this.absenceList) {
      if (absence.typeOfAbsence === 'vacation') {
        let start = absence.from;
        let end = absence.to;

        while (start <= end) {
          this.vacationArr.push(moment(start).format('L'));
          start = moment(start)
            .add(1, 'days')
            .format('L');
        }
      }
      if (absence.typeOfAbsence === 'sickness') {
        let start = absence.from;
        let end = absence.to;
        while (start <= end) {
          this.sicknessArr.push(moment(start).format('L'));
          start = moment(start)
            .add(1, 'days')
            .format('L');
        }
      }
    }
  }

  cancelClick() {
    this.popoutView = false;
  }
  requestClick() {
    this.startValue = moment(this.timeSpan.value.startDate).format('L');
    this.endValue = moment(this.timeSpan.value.endDate).format('L');
    this.typeOfAbsenceValue = this.timeSpan.value.typeOfAbsence;

    this.store.dispatch(
      addAbsence({
        from: this.startValue,
        to: this.endValue,
        typeOfAbsence: this.typeOfAbsenceValue
      })
    );
    this.absenceType();
    console.log(this.checkValid())
    this.timeSpan.patchValue({
      endDate: ''
    });
    this.timeSpan.patchValue({
      typeOfAbsence: ''
    });
  }

  ngOnInit() {
    this.store.select('absence').subscribe(state => {
      this.absenceList = state;
    });
  }

  checkValid() {
    this.timeSpan.value.startDate &
    this.timeSpan.value.endDate &
    this.timeSpan.value.typeOfAbsence
      ? true
      : false;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  dateFilter(date:any){
    debugger
    let day = moment(date).format('L')
    if (this.vacationArr !== undefined && !this.vacationArr.includes(day) === false){
      return true
    }
    else {
      return false
    }

  }
}
