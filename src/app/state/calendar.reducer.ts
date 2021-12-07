import { createReducer, on } from '@ngrx/store';

import { addAbsence, removeAbsence } from './calendar.actions';
import { Absence } from '../calendar/calendar.model';
import {StoreModule} from '@ngrx/store';



export const initialState: any[] = [];


export const absenceReducer = createReducer(
  initialState,
  on(addAbsence, (state: any) => ({...state, from:state.from, to:state.to, typeOfAbsence:state.typeOfAbsence})
));
