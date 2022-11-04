import React, { useEffect, useState, useRef } from "react";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, format, DateRange, addDays, CircularProgress, Box, api, Swal} from "../imports";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as xlsx from "xlsx";

const columns = [
  { id: "_emplcode", label: "EmpCode", minWidth: 150 },
  { id: "_empname", label: "Employee Name", minWidth: 150 },
  { id: "_emppos", label: "Position", minWidth: 150 },
  { id: "_empPlant", label: "Plant", minWidth: 150 },
  { id: "_deptCode", label: "Department", minWidth: 150 },
  { id: "_sectCode", label: "Section", minWidth: 150 },
  { id: "_DTR_date", label: "DTR Date", minWidth: 150 },
  { id: "_time_In3", label: "Time In", minWidth: 150 },
  { id: "_timeOut3", label: "Time Out", minWidth: 150 },
  { id: "_TotHours", label: "Total Hours", minWidth: 150 },
  { id: "_OB_hours", label: "OB Hours", minWidth: 150 },
  { id: "_remarks", label: "Remarks", minWidth: 150 },
];



const WFH = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    setLoading(true)
    try {
      await fetch(
        api.url + `/api/Attendance/GetWFH?sDate=${sDate}&eDate=${eDate}`,
        { method: "GET" }
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

      xlsx.utils.book_append_sheet(wb, ws, "WFH");

      xlsx.writeFile(wb, "WFH.xlsx");
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
          rowsPerPageOptions={[10, 25, 50]}
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

export default WFH;
