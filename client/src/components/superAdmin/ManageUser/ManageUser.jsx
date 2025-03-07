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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DownloadIcon from "@mui/icons-material/Download";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const ManageUser = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/fetchExaminationC")
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setFilteredRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log(rows);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    const updatedRows = rows.filter((r) => r !== rowToDelete);
    setRows(updatedRows);
    setFilteredRows(updatedRows);
    setOpenDialog(false);
    setRowToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setRowToDelete(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRows(
      rows.filter(
        (row) =>
          row.userid.toLowerCase().includes(query) ||
          row.name.toLowerCase().includes(query) ||
          row.email.toLowerCase().includes(query) ||
          row.mobile.includes(query) ||
          row.university.toLowerCase().includes(query)
      )
    );
  };
  const exportToCSV = () => {
    const csvRows = [
      [
        "UserID",
        "Name",        
        "Email",
        "Mobile",
        "University",
      ],
      ...rows.map((row) => [
        row.username,
        row.Name,
        row.email,
        row.mobile,
        row.university.Name,
      ]),
    ];

    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Users.csv";
    link.click();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", width: "95%" }}>
      <Button
          variant="contained"
          color="primary"
          onClick={exportToCSV}
          style={{ marginRight: "20px" }}
        >
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
      <Paper style={{ width: "95%", margin: "20px auto", padding: "10px" }} elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>University</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.university.Name}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => alert("Edit functionality here")}> <EditIcon /> </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(row)}> <DeleteIcon /> </IconButton>
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

      <Dialog open={openDialog} onClose={handleDeleteCancel} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the user "{rowToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
