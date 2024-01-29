import axios from "axios";
import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import { api } from "../imports";
import TextField from "@mui/material/TextField";

const columns = [
  { id: "empd_ID", name: "Employee ID" },
  { id: "name", name: "Employee Name" },
  { id: "dtr_date", name: "Date" },
  { id: "empShift", name: "Shift" },
  { id: "time_In1", name: "Time In 1" },
  { id: "timeOut1", name: "Time Out 1" },
  { id: "time_In2", name: "Time In 2" },
  { id: "timeOut2", name: "Time Out 2" },
  { id: "timeUndr", name: "Undertime" },
  { id: "ot_hours", name: "OT Hours" },
];

function Undertime() {
  const [rows, setRows] = React.useState([]);
  const [searchEmp, setSearchEmp] = React.useState("");
  const [searchShift, setSearchShift] = React.useState("");
  const [searchDate, setSearchDate] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        api.url + "/api/attendance/getUnderTime",
        {
          headers: {
            Authorization: `${sessionStorage.getItem("token")}`,
          },
        }
      );
      setRows(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto mt-5">
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
          <TextField
            id="date"
            label="Date"
            variant="filled"
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </Col>
        <Col>
          <TextField
            id="shift"
            label="Shift"
            variant="filled"
            onChange={(e) => setSearchShift(e.target.value)}
          />
        </Col>
      </Row>
      <Table striped bordered>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            .filter((item) => {
              return searchEmp.toLowerCase() === ""
                ? item
                : item.empd_ID.toLowerCase().includes(searchEmp);
            })
            .filter((item) => {
              return searchShift.toLowerCase() === ""
                ? item
                : item.empShift.toLowerCase().includes(searchShift);
            })
            .filter((item) => {
                return searchDate.toLowerCase() === ""
                  ? item
                  : item.dtr_date.toLowerCase().includes(searchDate);
              })
            .map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.id}>{row[column.id]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Undertime;
