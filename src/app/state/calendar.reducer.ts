import { createReducer, on } from '@ngrx/store';

import { addAbsence, removeAbsence, viewAbsence } from './calendar.actions';
import { Absence } from '../calendar/calendar.model';
import {StoreModule} from '@ngrx/store';



export const initialState: any[] = [];


export const absenceReducer = createReducer(
  initialState,
  on(addAbsence, (state: any, payload: {from: string, to: string, typeOfAbsence: string }) => ([...state, payload])
),
on(removeAbsence, (state: any, payload: {from: string}) => (state.filter((absence: {from:string}) => absence.from !== payload.from))
));

