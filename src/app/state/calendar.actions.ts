import { createAction, props } from '@ngrx/store';
import { Absence } from '../calendar/calendar.model';

export const addAbsence = createAction(
  'Add Absence',
  props<{from: string, to: string, typeOfAbsence: string, id:number }>()
);

export const removeAbsence = createAction(
  'Remove Absence',
  props<{from: string }>()
);

export const editAbsence = createAction(
  'Add Absence',
  props<{from: string, to: string, typeOfAbsence: string }>()
);

export const viewAbsence = createAction(
  'View Absence'
);
