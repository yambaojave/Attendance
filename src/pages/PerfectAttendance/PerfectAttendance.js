import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "react-bootstrap/Button";

//Date Range Dependencies
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import * as xlsx from "xlsx";
import api from "../../api-proxy";

const columns = [
  { id: "_emplCode", label: "EmpCode", minWidth: 10 },
  { id: "_LName", label: "LastName", minWidth: 150 },
  { id: "_FName", label: "FirstName", minWidth: 150 },
  { id: "_MName", label: "MiddleName", minWidth: 150 },
  { id: "_dHire", label: "Date Hired", minWidth: 120 },
  { id: "_dResign", label: "Date Resigned", minWidth: 150 },
  { id: "_empPlant", label: "Plant", minWidth: 100 },
  { id: "_DeptCode", label: "Department", minWidth: 150 },
  { id: "_SectCode", label: "Section", minWidth: 100 },
  { id: "_ChargeCode", label: "Charge Code", minWidth: 150 },
  { id: "_empPos", label: "Position", minWidth: 150 },
  { id: "_REGHRS", label: "REGHRS", minWidth: 100 },
  { id: "_OTHRS", label: "OTHRS", minWidth: 100 },
  { id: "_ABSENT", label: "ABSENT", minWidth: 100 },
  { id: "_LATE", label: "LATE", minWidth: 100 },
  { id: "_UNDERTIME", label: "UNDERTIME", minWidth: 100 },
  { id: "_SLSW", label: "SLSW", minWidth: 100 },
  { id: "_ML", label: "ML", minWidth: 100 },
  { id: "_VLVW", label: "VLVW", minWidth: 100 },
  { id: "_PLPW", label: "PLPW", minWidth: 100 },
  { id: "_BLBW", label: "BLBW", minWidth: 100 },
  { id: "_SPLSPW", label: "SPLSPW", minWidth: 100 },
  { id: "_SP", label: "SP", minWidth: 100 },
  { id: "_SD", label: "SD", minWidth: 100 },
  { id: "_VD", label: "VD", minWidth: 100 },
  { id: "_NP", label: "NP", minWidth: 100 },
  { id: "_NW", label: "NW", minWidth: 100 },
  { id: "_BDL", label: "BDL", minWidth: 100 },
  { id: "_EL", label: "EL", minWidth: 100 },
];

const PerfectAttendance = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  //DateRange Side
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, [range]);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  //Pagination Side
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Fetching of Data
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const fetchDate = async () => {
    let sDate = format(range[0].startDate, "yyyy-MM-dd");
    let eDate = format(range[0].endDate, "yyyy-MM-dd");
    console.log(sDate, eDate);
    setLoading(true)
    try {
      await fetch(
        api.url + `/api/Attendance/GetAttendance?sDate=${sDate}&eDate=${eDate}`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setLoading(false);
            return alert(`No Data Loaded!`);
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

      xlsx.utils.book_append_sheet(wb, ws, "Perfect_Attendance");

      xlsx.writeFile(wb, "Attendance.xlsx");
    }
  };

  return (
    <Grid item xs={8}>
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
          <Button variant="primary" onClick={() => fetchDate()}>
            {loading ? <Box sx={{ display: "flex" }}>
              <CircularProgress color="secondary"/>
            </Box> : "LOAD DATA"}
            
            
            
          </Button>
          <Button
            className="ms-3"
            variant="success"
            onClick={() => CreateExcelFile()}
          >
            Export Data To Excel
          </Button>
        </div>
      </div>

      <Paper sx={{ width: "125%", overflow: "hidden" }} className="m-3">
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table" id="table_data">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._emplCode}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 250, 500, 1000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
};

export default PerfectAttendance;

//Note: Change Format of Date for dHired and dResigned
// 1. Convert Date from SQL to "yyyy-MM-dd"
// 2. Convert React Date to "yyyy-MM-dd"
