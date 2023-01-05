import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";
import img2 from "./img/dashboard.png";


const mdTheme = createTheme();

function DashboardContent() {
  const position = [17.45, 78.38];

  return (
 
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{
          backgroundImage: `url(${img2})`,
          backgroundRepeat: "no-repeat",
          height: "80vh",
        }}>
             
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
