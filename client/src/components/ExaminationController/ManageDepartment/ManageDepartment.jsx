import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { useSelector } from 'react-redux';


export const ManageDepartment = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);
  const university = useSelector((state) => state.auth.university);
  console.log(university);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getDepartments?uni=${university}`);
      console.log(response.data); // Check if data is correctly received
      setRows(response.data);
      setFilteredRows(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRows(
      rows.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      )
    );
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", width: "95%" }}>
        <Button variant="contained" color="primary" style={{ marginRight: "20px" }}>
          <DownloadIcon style={{ marginRight: "10px" }} /> Export to CSV
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: "30%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Paper style={{ width: "95%", margin: "15px auto", padding: "10px" }} elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department ID</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department Examination Officer</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.departmentID}</TableCell>
                  <TableCell>{row.departmentName}</TableCell>
                  <TableCell>{row.departmentEmail}</TableCell>
                  <TableCell>{row.DOE}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteIcon sx={{ color: "gray", "&:hover": { color: "red" }, transition: "color 0.3s ease" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
