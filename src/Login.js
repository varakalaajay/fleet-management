import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import login from "./img/loginbg.png";
import "./styles.css";
import { Container } from "@mui/system";


const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
    } else {
      navigate("/dashboard");
    }
  }, [token]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const getLogin = async () => {
      try {
        const res = await axios.post(
          "http://54.226.199.64:8001/infinite/try_login",
          {
            email: email,
            password: password,
          }
        );

        localStorage.setItem("token", res.data.x_token);
        localStorage.setItem("user", res.data.x_user);
        /* swal({
          text: "Successfully Logged-In",
          icon: "success",
          type: "success",
        }); */
        if (res.data.status === "200") {
          navigate("/dashboard");          
        } else {
          swal({
            text: "Incorrect Email/Password",
            icon: "error",
            type: "error",
          });
        }

      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      }
      
    };
    getLogin();
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          backgroundImage: `url(${login})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Container component="main" maxWidth="xl">
          <Box
            sx={{
              marginTop: 12,
              marginLeft: 125,
              float: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f5f5f570",
              padding: "25px",
              borderRadius: "20px",
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
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
              <Footer sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  );
}
