import React, { Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
/* import Dashboard from "./Dashboard"; */
/* import SpotDevice from "./SpotDevice";
import AddDevice from "./AddDevice"; */
import Header from "./Header";
import { Box } from "@mui/material";
/* import Login from "./Login";
import DrawMap from "./draw"; */
const mdTheme = createTheme();
const Dashboard = React.lazy(() => import("./Dashboard"));
const SpotDevice = React.lazy(() => import("./SpotDevice"));
const AddDevice = React.lazy(() => import("./AddDevice"));
const Login = React.lazy(() => import("./Login"));
const DrawMap = React.lazy(() => import("./draw"));
function App() {
  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-device" element={<AddDevice />} />
            <Route path="/spot-device" element={<SpotDevice />} />
            <Route path="/add-geofence" element={<DrawMap />} />
            {/* <Route component={NotFound}/> */}
          </Routes>
          </Suspense>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
