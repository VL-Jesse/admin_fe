import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//reducers
import userReducer from '../Reducer/userReducer';
import onlineDealsReducer from '../Reducer/onlineDealsReducer';
import businessReducer from '../Reducer/businessReducer';
import authReducer from '../Reducer/authReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    onlineDeals: onlineDealsReducer,
    business: businessReducer,
    auth: authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
