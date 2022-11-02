import App from '../App';
import { Navigate } from 'react-router-dom';
import  UserContext   from './UserContext';
import { useContext } from 'react';
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const context = useContext(UserContext);
    const {user} = context;
    ///console.log(user.token);
    return(
        user.token ? <Outlet /> : <Navigate to="/SignIn"/>
    )
}

export default PrivateRoutes