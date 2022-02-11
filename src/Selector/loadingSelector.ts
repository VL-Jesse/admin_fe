import { RootState } from "../app/store";

export const selectLoading = (state: RootState) => {
    const business = state.business.status
    const user = state.user.status
    const onlineDeals = state.onlineDeals.status
    const auth = state.auth.status
    if(user === "loading" || business === "loading" || onlineDeals  === "loading" || auth === "loading" ){
        return true
    }
    return false
  };
  