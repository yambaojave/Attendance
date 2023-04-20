import React, { useEffect, useState, useRef } from "react";
import * as xlsx from "xlsx";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, format, DateRange, addDays, CircularProgress, Box, api, Swal} from "../imports";


const columns = [
  { id: "compcode", label: "compcode", minWidth: 150 },
  { id: "empd_id", label: "empd_id", minWidth: 150 },
  { id: "name", label: "name", minWidth: 150 },
  { id: "username", label: "username", minWidth: 150 },
  { id: "fname", label: "fname", minWidth: 150 },
  { id: "lname", label: "lname", minWidth: 150 },
  { id: "mname", label: "mname", minWidth: 150 },
  { id: "estreet", label: "estreet", minWidth: 150 },
  { id: "empCode", label: "empCode", minWidth: 150 },
  { id: "bPlace", label: "bPlace", minWidth: 150 },
  { id: "contactP", label: "contactP", minWidth: 150 },
  { id: "conAddress", label: "conAddress", minWidth: 150 },
  { id: "contactNum", label: "contactNum", minWidth: 150 },
  { id: "dHire", label: "dHire", minWidth: 150 },
  { id: "dResign", label: "dResign", minWidth: 150 },
  { id: "awolReason", label: "awolReason", minWidth: 150 },
  { id: "deptcode", label: "deptcode", minWidth: 150 },
  { id: "sectcode", label: "sectCode", minWidth: 150 },
  { id: "empPos", label: "empPos", minWidth: 150 },
  { id: "funcDesc", label: "funcDesc", minWidth: 150 },
  { id: "chargeCode", label: "chargeCode", minWidth: 150 },
  { id: "orgStructure", label: "orgStructure", minWidth: 150 },
  { id: "jobCatalogNum", label: "jobCatalogNum", minWidth: 150 },
  { id: "jobCatCharging", label: "jobCatCharging", minWidth: 150 },
  { id: "standardWorkDays", label: "standardWorkDays", minWidth: 150 },
  { id: "npnw", label: "npnw", minWidth: 150 },
  { id: "absences", label: "absences", minWidth: 150 },
  { id: "regularDays", label: "regularDays", minWidth: 150 },
  { id: "regularHours", label: "regularHours", minWidth: 150 },
  { id: "regularOT", label: "regularOT", minWidth: 150 },
  { id: "restDays", label: "restDays", minWidth: 150 },
  { id: "restdayOT", label: "restdayOT", minWidth: 150 },
  { id: "holiDays", label: "holiDays", minWidth: 150 },
  { id: "holidayOT", label: "holidayOT", minWidth: 150 },
  { id: "leavePay", label: "leavePay", minWidth: 150 },
  { id: "leaveNoPay", label: "leaveNoPay", minWidth: 150 },
];


const MonthlyExtraction = () => {
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

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const fetchDate = async () => {
    let sDate = format(range[0].startDate, "yyyy-MM-dd");
    let eDate = format(range[0].endDate, "yyyy-MM-dd");
    //console.log(sDate, eDate);
    //console.log(db); 


    setLoading(true)

    try {
      await fetch(
        api.url + `/api/Attendance/GetExtractionMonthly?sDate=${sDate}&eDate=${eDate}`,
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

      xlsx.utils.book_append_sheet(wb, ws, "Monthly Extraction");

      xlsx.writeFile(wb, "MonthlyExtraction.xlsx");
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

      <Paper sx={{ width: "125%", overflow: "hidden" }} className="m-3">
        <TableContainer sx={{ maxHeight: '80vh' }}>
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
                      key={row.empd_id}
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

export default MonthlyExtraction;
