import { Navigate } from 'react-router-dom';
import  UserContext   from '../utils/UserContext';
import { useContext } from 'react';
import { Outlet } from "react-router-dom";
import Swal from 'sweetalert2'

const SignOut = () => {
    const context = useContext(UserContext);
    const {user,setUser} = context;
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be Log out from the page.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
            setUser({token:false});
            return(
            user.token ? <Outlet /> : <Navigate to="/SignIn"/>
        )     
        }
      })
    
    
}

export default SignOut;