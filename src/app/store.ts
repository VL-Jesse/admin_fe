import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//reducers
import userReducer from '../Reducer/userReducer';
import onlineDealsReducer from '../Reducer/onlineDealsReducer';
import businessReducer from '../Reducer/businessReducer';
import authReducer from '../Reducer/authReducer';
import userDealReducer from '../Reducer/userDealReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    onlineDeals: onlineDealsReducer,
    business: businessReducer,
    auth: authReducer,
    userDeals: userDealReducer
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
