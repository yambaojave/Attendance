import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hired from './pages/Hired/Hired';
import Lf_Of_CS from './pages/Lf_Of_CS/Lf_Of_CS';
import Lf_Of_OT from './pages/Lf_Of_OT/Lf_Of_OT';
import MonthEndOT from './pages/MonthEndOT/MonthEndOT';
import NoLogs from './pages/NoLogs/NoLogs';
import PerfectAttendance from './pages/PerfectAttendance/PerfectAttendance';
import Resigned from './pages/Resigned/Resigned';
import WFH from './pages/WFH/WFH';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "perfectAttendace",
        element: <PerfectAttendance />,
      },
      {
        path: "hired",
        element: <Hired />,
      },
      {
        path: "resigned",
        element: <Resigned />,
      },
      {
        path: "wfh",
        element: <WFH />,
      },
      {
        path: "lf_of_ot",
        element: <Lf_Of_OT />,
      },
      {
        path: "lf_of_cs",
        element: <Lf_Of_CS />,
      },
      {
        path: "noLogs",
        element: <NoLogs />,
      },
      {
        path: "monthEndOt",
        element: <MonthEndOT />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ]
  },
  

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

