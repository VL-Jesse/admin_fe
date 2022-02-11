import { useDispatch, useSelector } from "react-redux";
import { refreshingLogin } from "../Actions/authActions";
import { RootState } from "../app/store";
import { logoutSucess } from "../Reducer/authReducer";  
  
  export const useAuthHook = () =>{
    const dispatch = useDispatch()
    const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);

    const updateStore = async () => {
      if(isRefreshing  ) return
      dispatch(refreshingLogin())
      return
    };
    
    const removeUser = () => {
      dispatch(logoutSucess())
      sessionStorage.clear();
      return
    };

    return {
    updateStore,
    removeUser,
  }};