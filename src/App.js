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

function App() {
  const [user, setUser] = useState({ token: false });

  //console.log(user.token.toString());

  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <Grid container>
          {
            (user.token) ?
            <Navbar />
            :
            <></>
          }
          
          <Routes>
            <Route element={<PrivateRoutes />} path="/">
              <Route element={<PerfectAttendance />} path="/perfectAttendance" />
              <Route element={<Hired />} path="/hired" />
              <Route element={<Resigned />} path="/resigned" />
              <Route element={<WFH />} path="/wfh" />
              <Route element={<Lf_Of_OT />} path="/lf_of_ot" />
              <Route element={<Lf_Of_CS />} path="/lf_of_cs" />
              <Route element={<NoLogs />} path="/noLogs" />
              <Route element={<MonthEndOT />} path="/monthEndOt" />
              <Route element={<YearReport />} path="/yearReport" />
              <Route element={<SignOut />} path="/signout" />
              <Route element={<PageNotFound />} path="/*" />
            </Route>
            <Route element={<SignIn />} path="/SignIn" />
          </Routes>
        </Grid>
      </Router>
    </UserProvider>
  );
}

export default App;
