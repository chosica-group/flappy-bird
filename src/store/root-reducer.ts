import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';
import { instanceApi } from 'services/instance-api';
import { authReducer } from 'store/auth-reducer';

export const rootReducer = (history: History): any =>
  combineReducers({
    [instanceApi.reducerPath]: instanceApi.reducer,
    auth: authReducer,
    router: connectRouter(history),
  });
