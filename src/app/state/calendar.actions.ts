import { createAction, props } from '@ngrx/store';
import { Absence } from '../calendar/calendar.model';

export const addAbsence = createAction(
  'Add Absence',
  props<{from: string, to: string, abcenseType: string }>()
);

export const removeAbsence = createAction(
  'Remove Absence',
  props<{ id: string }>()
);
