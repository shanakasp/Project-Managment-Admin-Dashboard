import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { mockDataContacts } from "../../../data/mockData";
import { tokens } from "../../../theme";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleCategoryChange = (event, id) => {
    // Handle category change logic here
    console.log(
      "Category changed for row with ID:",
      id,
      "New value:",
      event.target.value
    );
  };

  const handleViewClick = (id) => {
    // Handle view button click logic here
    console.log("View button clicked for row with ID:", id);
  };

  const handleEditClick = (id) => {
    // Handle edit button click logic here
    console.log("Edit button clicked for row with ID:", id);
  };

  const handleDeleteClick = (id) => {
    // Handle delete button click logic here
    console.log("Delete button clicked for row with ID:", id);
  };

  const columns = [
    { field: "id", headerName: "Project ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Project Title",
      flex: 1.2,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Start Date",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "zipCode",
      headerName: "End Date",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(event) => handleCategoryChange(event, params.id)}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Developing">Developing</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      ),
    },
    {
      headerName: "Actions",
      flex: 0.6,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View">
            <Link to={`/project/viewproject/${params.row.id}`}>
              <IconButton
                onClick={() => handleViewClick(params.row.id, params.row.role)}
              >
                <VisibilityIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/project/editproject/${params.row.id}`}>
              <IconButton
                onClick={() => handleEditClick(params.row.id, params.row.role)}
              >
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteClick(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="PROJECTS" subtitle="List of All the Projects" />
      <Box
        m="10px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[800],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          sx={{ fontSize: "15px" }}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
