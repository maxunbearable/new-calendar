import { createReducer, on } from '@ngrx/store';

import {
  addAbsence,
  removeAbsence,
  viewAbsence,
  editAbsence
} from './calendar.actions';
import { Absence } from '../calendar/calendar.model';
import { StoreModule } from '@ngrx/store';

export const initialState: any[] = [];

export const absenceReducer = createReducer(
  initialState,
  on(
    addAbsence,
    (
      state: any,
      payload: { from: string; to: string; typeOfAbsence: string; id:number }
    ) => [...state, payload]
  ),
  on(
    editAbsence,
    (
      state: any,
      payload: { id:number }
    ) =>
      state.map(
        (absence: { id:number }) =>
          absence.id === payload.id
            ? (absence = payload)
            : absence
      )
  ),
  on(removeAbsence, (state: any, payload: { from: string }) =>
    state.filter((absence: { from: string }) => absence.from !== payload.from)
  )
);
