import { Component } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { CalendarService } from './popout/calendar-service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  addAbsence,
  viewAbsence,
  removeAbsence,
  editAbsence
} from './state/calendar.actions';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  closeResult = '';

  timeSpan = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    typeOfAbsence: new FormControl('')
  });

  absenceList!: any[];
  sicknessArr: any[] = [];
  vacationArr: any[] = [];

  isNew = true;

  constructor(
    private store: Store<{ absence: any }>,
    private modalService: NgbModal
  ) {
    store.select('absence');
  }

  title = 'event-calendar 2021';

  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  dateFilter = (date: any) => {
    let day = moment(date).format('L');

    if (this.isNew) {
      return (
        this.vacationArr.includes(day) !== true &&
        this.sicknessArr.includes(day) !== true
      );
    } else {
      return true;
    }
  };

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

  cellClick(value: string) {
    this.isNew = true;
    this.timeSpan.patchValue({
      startDate: new Date(value)
    });
    for (let absence of this.absenceList) {
      if (this.absenceList[0] && value <= absence.to && value >= absence.from) {
        this.isNew = false;
        let startEvent = absence.from;
        let endEvent = absence.to;
        let typeEvent = absence.typeOfAbsence;
        this.timeSpan.patchValue({
          startDate: new Date(startEvent)
        });
        this.timeSpan.patchValue({
          endDate: new Date(endEvent)
        });
        this.timeSpan.patchValue({
          typeOfAbsence: typeEvent
        });
        break;
      } else {
        this.timeSpan.patchValue({
          endDate: ''
        });
        this.timeSpan.patchValue({
          typeOfAbsence: ''
        });
      }
    }
  }

  public monthList = this.months.map((month: number) => {
    return this.getDaysArrayByMonth(month);
  });

  creatingArrOfAbsenceType() {
    this.sicknessArr = [];
    this.vacationArr = [];
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

  requestClick() {
    this.store.dispatch(
      addAbsence({
        from: moment(this.timeSpan.value.startDate).format('L'),
        to: moment(this.timeSpan.value.endDate).format('L'),
        typeOfAbsence: this.timeSpan.value.typeOfAbsence,
        id: Math.floor(Math.random()*1000000000)
      })
    );

    this.creatingArrOfAbsenceType();
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
  removingCalendarArr() {
    if ((this, this.timeSpan.value.typeOfAbsence === 'vacation')) {
      let start = moment(this.timeSpan.value.startDate).format('L');
      let end = moment(this.timeSpan.value.endDate).format('L');
      while (start <= end) {
        this.vacationArr.splice(this.vacationArr.indexOf(start), 1);
        start = moment(start)
          .add(1, 'days')
          .format('L');
      }
    } else {
      if ((this, this.timeSpan.value.typeOfAbsence === 'sickness')) {
        let start = moment(this.timeSpan.value.startDate).format('L');
        let end = moment(this.timeSpan.value.endDate).format('L');
        while (start <= end) {
          this.sicknessArr.splice(this.sicknessArr.indexOf(start), 1);
          start = moment(start)
            .add(1, 'days')
            .format('L');
        }
      }
    }
  }
  onRemoveClick() {
    this.removingCalendarArr();
    this.store.dispatch(
      removeAbsence({
        from: moment(this.timeSpan.value.startDate).format('L')
      })
    );
    this.creatingArrOfAbsenceType();
    this.timeSpan.patchValue({
      endDate: ''
    });
    this.timeSpan.patchValue({
      typeOfAbsence: ''
    });
    this.timeSpan.patchValue({
      startDate: ''
    });
  }
  onEditClick() {
    let pastStart = moment(this.timeSpan.value.startDate).format('L');
    let pastEnd = moment(this.timeSpan.value.endDate).format('L');
    let pastType = this.timeSpan.value.typeOfAbsence;
    this.onRemoveClick();
    this.store.dispatch(
      addAbsence({
        from: pastStart,
        to: pastEnd,
        typeOfAbsence: pastType
      })
    );
    this.removingCalendarArr();
    this.creatingArrOfAbsenceType();
  }
  onEditClick2(){
    let pastStart = moment(this.timeSpan.value.startDate).format('L');
    let pastEnd = moment(this.timeSpan.value.endDate).format('L');
    let pastType = this.timeSpan.value.typeOfAbsence;
        this.store.dispatch(
      addAbsence({
        from: pastStart,
        to: pastEnd,
        typeOfAbsence: pastType
      })
    );
    this.removingCalendarArr();
    this.creatingArrOfAbsenceType();

  }
}
