import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Grid from "@mui/material/Grid";
import { UserProvider } from "./utils/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hired from "./pages/Hired/Hired";
import Lf_Of_CS from "./pages/Lf_Of_CS/Lf_Of_CS";
import Lf_Of_OT from "./pages/Lf_Of_OT/Lf_Of_OT";
import MonthEndOT from "./pages/MonthEndOT/MonthEndOT";
import NoLogs from "./pages/NoLogs/NoLogs";
import PerfectAttendance from "./pages/PerfectAttendance/PerfectAttendance";
import Resigned from "./pages/Resigned/Resigned";
import WFH from "./pages/WFH/WFH";
import YearReport from "./pages/YearReport/YearReport";
import SignIn from "./pages/Login/SignIn";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoutes from "./utils/PrivateRoutes";
import SignOut from "./pages/SignOut";
import MonthlyExtraction from "./pages/MonthlyExtraction/MonthlyExtraction";
import ErrorTimesheet from "./pages/ErrorTimesheet/ErrorTimesheet";
import Undertime from "./pages/Undertime/Undertime";
import LateTimesheet from "./pages/LateTimesheet/LateTimesheet";
import WeeklySchedule from "./pages/WeeklySchedule/WeeklySchedule";

function App() {
  const base_url = process.env.PUBLIC_URL;
  const getToken = sessionStorage.getItem("token"); ///test
  
  const [user, setUser] = useState({ token: false });

  return (
    <UserProvider value={{ user, setUser }}>
      <Router basename={`${base_url}`}>
        <Grid container>
          {
            (getToken) ?
            <Navbar />
            :
            <></>
          }
          
          <Routes>
            <Route element={<PageNotFound />} exact path='/*' />
            <Route element={<PrivateRoutes />} exact path='/'>
              <Route element={<PerfectAttendance />} exact path='/perfectAttendance' />
              <Route element={<Hired />} exact path='/hired' />
              <Route element={<Resigned />} exact path='/resigned' />
              <Route element={<WFH />} exact path='/wfh' />
              <Route element={<Lf_Of_OT />} exact path='/lf_of_ot' />
              <Route element={<Lf_Of_CS />} exact path='/lf_of_cs' />
              <Route element={<NoLogs />} exact path='/noLogs' />
              <Route element={<MonthEndOT />} exact path='/monthEndOt'/>
              <Route element={<YearReport />} exact path='/yearReport' />
              <Route element={<MonthlyExtraction />} exact path='/monthlyExtraction' />
              <Route element={<ErrorTimesheet />} exact path='/ErrorTimesheet' />
              <Route element={<Undertime />} exact path='/underTimesheet' />
              <Route element={<LateTimesheet />} exact path='/lateTimesheet' />
              <Route element={<WeeklySchedule />} exact path='/WeeklySchedule' />
              <Route element={<SignOut />} exact path='/signout' />
              <Route element={<PageNotFound />} exact path='/*' />
            </Route>
            <Route element={<SignIn />} exact path='/SignIn' />
            
          </Routes>
        </Grid>
      </Router>
    </UserProvider>
  );
}

export default App;
