import React, { useContext} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import  UserContext   from '../../utils/UserContext';
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../imports";


const theme = createTheme();

const  SignIn = () => {
  const history = useNavigate();
  const { setUser } = useContext(UserContext);
  const getToken = localStorage.getItem("token"); ///test

  const auth = (user, pass) => {
    //return accounts.findIndex(account => account.username === user && account.password === pass) !== -1
    let payload = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'Username' : user,
        "Password" : pass
      })
    }

    fetch(api.url + '/api/login', payload)
    .then((response) => response.json())
    .then((response) => {
      //console.log(response);
      if (response.result === 'authenticated') {
        sessionStorage.setItem('token', 'Bearer ' + response.token);
        setUser({token: true});
        history("/PerfectAttendance");
        return Swal.fire({
          icon: 'success',
          title: 'Welcome!!',
          showConfirmButton: false,
          timer: 1000
        });
      }
      else if (response.result === 'User not Found') {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");


    if (username === '' && password === ''){
      return Swal.fire({
        icon: 'error',
        title: 'Please enter your username and password!',
        showConfirmButton: false,
        timer: 1000
      });
    }
    else
      auth(username, password);

    };

  return (
    <ThemeProvider theme={theme}>
      {
      getToken ? <Outlet /> : 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      }
    </ThemeProvider>
  );
}


export default SignIn;