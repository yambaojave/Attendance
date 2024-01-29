import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import {Grid, Button, format, DateRange,  CircularProgress, Box, api, addDays, Swal} from "../imports";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const columns = [
  { id: "date", label: "Date" },
  { id: "deptCode", label: "Department" },
  { id: "plantCode", label: "Plant" },
  { id: "shift", label: "Shift" },
  { id: "shiftCount", label: "Count" },
];

function WeeklySchedule() {
  const [rows, setRows] = React.useState([]);

  const [searchShift, setSearchShift] = React.useState("");

  const [searchDate, setSearchDate] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const refOne = React.useRef(null);
  const [db, setDb] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [range, setRange] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleChange = (event) => {
    setDb(event.target.value);
  };


  const fetchDate = async () => {
    let sDate = format(range[0].startDate, "yyyy-MM-dd");
    let eDate = format(range[0].endDate, "yyyy-MM-dd");
    //console.log(sDate, eDate);
    //console.log(db); 

    if(db === ''){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a Table type!',
      });
    }

    setLoading(true)
    console.log(db);
    try {
      await fetch(
        api.url + `/api/Attendance/GetMonthEndOT?sDate=${sDate}&eDate=${eDate}&db=${db}`,
        { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${sessionStorage.getItem("token")}`
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setLoading(false);
            return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
          setRows(data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const CreateExcelFile = () => {
    if (rows.length === 0) {
      return alert("No Data Available. Please Load Data First!");
    } else {
      let wb = xlsx.utils.book_new(),
        ws = xlsx.utils.json_to_sheet(rows);

      xlsx.utils.book_append_sheet(wb, ws, "MonthOT");

      xlsx.writeFile(wb, "MonthOT.xlsx");
    }
  };


//   React.useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(
//         api.url + "/api/Attendance/WeeklyTotalSchedCount?DB=JSPH", {
//           headers: {
//             'Authorization': `${sessionStorage.getItem("token")}`
//           }
//         }
//       );
//       setRows(response.data);
//     };

//     fetchData();
//   }, []);

  return (
    <Grid item xs={10} className="mt-5 mx-auto">
    <div className="row">
        <div className="col-4">
          <div className="calendarWrap m-3">
            <input
              value={`${format(range[0].startDate, "yyyy-MM-dd")} to ${format(
                range[0].endDate,
                "yyyy-MM-dd"
              )}`}
              readOnly
              className="inputBox"
              onClick={() => setOpen((open) => !open)}
            />

            <div ref={refOne}>
              {open && (
                <DateRange
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  month={1}
                  direction="horizontal"
                  className="calendarElement"
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-8 mt-3">

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Select Table</InputLabel>
          <Select
            labelId="selectTable"
            id="dbSelect"
            value={db}
            label="Select Table"
            onChange={handleChange}
          >
            <MenuItem value={'JSPH'}>JSPH</MenuItem>
            <MenuItem value={'CONTRACT'}>CONTRACT</MenuItem>

          </Select>
        </FormControl>

          <Button className="mt-2 ms-5" variant="primary" onClick={() => fetchDate()}>
            {loading ? <Box sx={{ display: "flex" }}>
              <CircularProgress color="secondary"/>
            </Box> : "LOAD DATA"}
            
            
            
          </Button>
          <Button
            className="ms-3 mt-2"
            variant="success"
            onClick={() => CreateExcelFile()}
          >
            Export Data To Excel
          </Button>
        </div>
      </div>
      <Row className="mb-3">
        <Col>
          <TextField id="date" label="Date" variant="filled" onChange={(e) => setSearchDate(e.target.value)}/>
        </Col>
        <Col>
          <TextField id="shift" label="Shift" variant="filled" onChange={(e) => setSearchShift(e.target.value)}/>
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
    </Grid>
  );
}

export default WeeklySchedule;



