import React, { useReducer } from 'react';

import UserContext from './userContext';
import UserReducer from './userReducer';

import { SET_USERNAME, SET_HOST } from '../types';

const UserState = (props) => {
  const initialState = {
    username: '',
    isHost: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setUsername = (u) => {
    console.log(u);
    dispatch({
      type: SET_USERNAME,
      payload: u,
    });
  };

  const setHost = () => {
    dispatch({
      type: SET_HOST,
      payload: true,
    });
  };

  return (
    <UserContext.Provider
      value={{
        username: state.username,
        isHost: state.isHost,
        setUsername,
        setHost,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
