import React, { useEffect, useState, useRef } from "react";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, format, DateRange, addDays, CircularProgress, Box, api, Swal} from "../imports";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as xlsx from "xlsx";

const columns = [
  { id: "_emplCode", label: "EMPD_ID", minWidth: 150 },
  { id: "_EName", label: "Employee Name", minWidth: 150 },
  { id: "_empPos", label: "Position", minWidth: 150 },
  { id: "_SectCode", label: "Section", minWidth: 150 },
  { id: "_dHire", label: "Date Hired", minWidth: 150 },
  { id: "_EmpCode", label: "Employee Code", minWidth: 150 },
  { id: "_VL", label: "VL", minWidth: 10 },
  { id: "_SL", label: "SL", minWidth: 10 },
  { id: "_BL", label: "BL", minWidth: 10 },
  { id: "_PL", label: "PL", minWidth: 10 },
  { id: "_NP", label: "NP", minWidth: 10 },
  { id: "_ML", label: "ML", minWidth: 10 },
  { id: "_SPL", label: "SPL", minWidth: 10 },
  { id: "_SML", label: "SML", minWidth: 10 },
  { id: "_BDL", label: "BDL", minWidth: 10 },
  { id: "_EL", label: "EL", minWidth: 10 },
  { id: "_TOTAL1", label: "TOTAL1", minWidth: 10 },
  { id: "_VW", label: "VW", minWidth: 10 },
  { id: "_SW", label: "SW", minWidth: 10 },
  { id: "_BW", label: "BW", minWidth: 10 },
  { id: "_NW", label: "NW", minWidth: 10 },
  { id: "_SPLW", label: "SPLW", minWidth: 10 },
  { id: "_TOTAL2", label: "TOTAL2", minWidth: 10 },
  { id: "_VD", label: "VD", minWidth: 10 },
  { id: "_SD", label: "SD", minWidth: 10 },
  { id: "_BD", label: "BD", minWidth: 10 },
  { id: "_PD", label: "PD", minWidth: 10 },
  { id: "_SPWD", label: "SPWD", minWidth: 10 },
  { id: "_SP", label: "SP", minWidth: 10 },
  { id: "_ABSENCES", label: "ABSENCES", minWidth: 10 },
  { id: "_TOTAL3", label: "TOTAL3", minWidth: 10 },

];



const YearReport = () => {

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
    setLoading(true)
    try {
      await fetch(
        api.url + `/api/Attendance/GetYearReport?sDate=${sDate}&eDate=${eDate}`,
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

      xlsx.utils.book_append_sheet(wb, ws, "YearReport");

      xlsx.writeFile(wb, "YearReport.xlsx");
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
        <TableContainer sx={{ maxHeight: '85vh' }}>
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

export default YearReport;
