import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Grid, api } from "../imports";
import TextField from "@mui/material/TextField";
import axios from "axios";

const columns = [
  { id: "emplCode", label: "EmpCode" },
  { id: "name", label: "Employee Name" },
  { id: "dtr_date", label: "Date" },
  { id: "empShift", label: "Shift" },
  { id: "time_In1", label: "Time In" },
  { id: "timeOut1", label: "Time Out" },
  { id: "dtr_stat", label: "Status" },
  { id: "day", label: "Day" },
  { id: "w_sun", label: "Sunday" },
  { id: "w_mon", label: "Monday" },
  { id: "w_tue", label: "Tuesday" },
  { id: "w_wed", label: "Wednesday" },
  { id: "w_thu", label: "Thursday" },
  { id: "w_fri", label: "Friday" },
  { id: "w_sat", label: "Saturday" },
  { id: "res1", label: "Control Number" },
  { id: "cnfrm_by", label: "Confirmed By" },
  { id: "status", label: "WS Status" },
];

function ErrorTimesheet() {
  const [rows, setRows] = React.useState([]);
  const [searchEmp, setSearchEmp] = React.useState("");
  const [searchShift, setSearchShift] = React.useState("");
  const [searchCN, setSearchCN] = React.useState("");
  const [searchDate, setSearchDate] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        api.url + "/api/Attendance/GetTSErrorTotalHrs", {
          headers: {
            'Authorization': `${sessionStorage.getItem("token")}`
          }
        }
      );
      setRows(response.data);
    };

    fetchData();
  }, []);

  return (
    <Grid item xs={10} className="mt-5 mx-auto">
      <Row className="mb-3">
        <Col>
          <TextField
            id="empl"
            label="Employee Number"
            variant="filled"
            onChange={(e) => setSearchEmp(e.target.value)}
          />
        </Col>
        <Col>
          <TextField id="date" label="Date" variant="filled" onChange={(e) => setSearchDate(e.target.value)}/>
        </Col>
        <Col>
          <TextField id="shift" label="Shift" variant="filled" onChange={(e) => setSearchShift(e.target.value)}/>
        </Col>
        <Col>
          <TextField id="control" label="Control Number" variant="filled" onChange={(e) => setSearchCN(e.target.value)}/>
        </Col>
      </Row>

      <Table striped bordered>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            .filter((item) => {
              return searchEmp.toLowerCase() === ""
                ? item
                : item.emplCode.toLowerCase().includes(searchEmp);
            })
            .filter((item) => {
              return searchShift.toLowerCase() === ""
                ? item
                : item.empShift.toLowerCase().includes(searchShift);
            })
            .filter((item) => {
              return searchCN.toLowerCase() === ""
                ? item
                : item.res1.toLowerCase().includes(searchCN);
            })
            .filter((item) => {
              return searchDate.toLowerCase() === ""
                ? item
                : item.dtr_date.toLowerCase().includes(searchDate);
            })
            .map((row, index) => (
              <tr key={index}>
                <td>{row.emplCode}</td>
                <td>{row.name}</td>
                <td>{row.dtr_date}</td>
                <td>{row.empShift}</td>
                <td>{row.time_In1}</td>
                <td>{row.timeOut1}</td>
                <td>{row.dtr_stat}</td>
                <td>{row.day}</td>
                <td>{row.w_sun}</td>
                <td>{row.w_mon}</td>
                <td>{row.w_tue}</td>
                <td>{row.w_wed}</td>
                <td>{row.w_thu}</td>
                <td>{row.w_fri}</td>
                <td>{row.w_sat}</td>
                <td>{row.res1}</td>
                <td>{row.cnfrm_by}</td>
                <td>{row.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Grid>
  );
}

export default ErrorTimesheet;
