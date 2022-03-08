import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Module/Login";
import { Users } from "../Module/Users/index";
import { path } from "./path";
import { Business } from "../Module/Businesses/index";
import { OnlineDeals } from "../Module/OnlineDeals/index";
import { FormUser } from "../Module/Users/form";
import { FormOnlineDeals } from "../Module/OnlineDeals/form";
import { FormBusinesses } from "../Module/Businesses/Form/form";
import { Home } from "../Module/Home/index";
import { Logout } from "../Module/Logout";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { UserDeal } from "../Module/UserDeal/index";

export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={path.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
        <Route path={path.LOGOUT} element={<PublicRoute><Logout /></PublicRoute>}/>
        {/* Privates routes */}
        <Route path={path.HOME} element={<PrivateRoute><Home /></PrivateRoute> }/>
        <Route path={path.USER} element={<PrivateRoute><Users /></PrivateRoute> } />
        <Route path={path.USEREDIT} element={<PrivateRoute><FormUser /></PrivateRoute>} />
        <Route path={path.USERCREATE} element={<PrivateRoute><FormUser /></PrivateRoute>} />
        <Route path={path.USERDEAL} element={<PrivateRoute><UserDeal /></PrivateRoute>} />
        <Route path={path.BUSINESSES} element={<PrivateRoute><Business /></PrivateRoute>} />
        <Route path={path.BUSINESSESCREATE} element={<PrivateRoute><FormBusinesses /></PrivateRoute> } />
        <Route path={path.BUSINESSESEDIT} element={<PrivateRoute><FormBusinesses /></PrivateRoute> } />
        <Route path={path.ONLINEDEALS} element={<PrivateRoute><OnlineDeals /></PrivateRoute>} />
        <Route path={path.ONLINEDEALSEDIT} element={<PrivateRoute><FormOnlineDeals /></PrivateRoute> } />
        <Route path={path.ONLINEDEALSCREATE} element={<PrivateRoute><FormOnlineDeals /></PrivateRoute> } />
      </Routes>
    </BrowserRouter>
  );
};
