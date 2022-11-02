import { Navigate } from 'react-router-dom';
import  UserContext   from '../utils/UserContext';
import { useContext } from 'react';
import { Outlet } from "react-router-dom";

const SignOut = () => {
    const context = useContext(UserContext);
    const {user,setUser} = context;
    setUser({token:false});
    return(
        user.token ? <Outlet /> : <Navigate to="/SignIn"/>
    )
}

export default SignOut;