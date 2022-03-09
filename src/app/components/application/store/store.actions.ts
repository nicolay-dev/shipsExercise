import { createAction, props } from '@ngrx/store';
import { IShip } from 'src/app/models/ship.model';
import { User } from 'src/app/models/user.model';

export const loginAction = createAction('[LOGIN] Login User', props<{user: User}>());
export const addUser = createAction('[LOGIN] Add User', props<{user: User}>());
export const deleteUser = createAction('[LOGIN] Delete User', props<{user: User}>());
export const loadShips = createAction('[SHIPS] Load Ships', props<{shipList: IShip[]}>());
