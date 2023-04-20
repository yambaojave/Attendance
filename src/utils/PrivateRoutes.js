import { Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const getToken = sessionStorage.getItem("token");
    return(
        getToken ? <Outlet /> : <Navigate to="/SignIn"/>
    )
}

export default PrivateRoutes