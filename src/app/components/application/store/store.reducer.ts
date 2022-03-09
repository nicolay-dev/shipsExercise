import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as _ from 'lodash';
import * as loginActions from './store.actions';
import { IShip } from 'src/app/models/ship.model';

export interface AppState {
  loginUser: User;
  userList: User[];
  shipList: IShip[];
}
 
export const intiAppState : AppState = {
  loginUser : {
    username: '',
    password: '',
    rol: ''
  },
  userList : [
    {username : 'holamundo', password : 'holamundo', rol: 'admin'},
    {username : 'user', password : 'holamundo', rol: 'user'}
  ],
  shipList: []
};

  export const managerUserReducer = createReducer(
    intiAppState,
    on(loginActions.loginAction, (state, { user }) => {
      let newState : AppState = _.cloneDeep(state);
      let foundUser = isValidUser(user, state);
      foundUser ? newState.loginUser = foundUser : newState.loginUser = intiAppState.loginUser
      return newState;
    }),
    on(loginActions.addUser, (state, { user }) => {
      let newState : AppState = _.cloneDeep(state);
      if (!isFoundUser(user, state)) {
        newState.userList = [...state.userList, user]
      }return newState;
    }),
    on(loginActions.deleteUser, (state, { user }) => { 
      let newState : AppState = _.cloneDeep(state);
      newState.userList = _.filter(state.userList, (item) => !_.isEqual(item, user));
      return newState;
    }),
    on(loginActions.loadShips, (state, { shipList }) => { 
      let newState : AppState = _.cloneDeep(state);
      newState.shipList = shipList;
      return newState;
    }));

  function isValidUser(user : User, state: AppState) {
    let userFound = _.find(state.userList, 
      (item) => _.isEqual(item.username, user.username) && _.isEqual(item.password, user.password));
    return userFound;
  }

  function isFoundUser (user : User, state: AppState) : boolean {
    let userFound = _.find(state.userList, (item) => item.username === user.username);
    if(userFound)
      return true;
    else
      return false;
  }



