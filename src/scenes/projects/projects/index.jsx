import { Visibility as VisibilityIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
const FormsUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("accessToken");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = async (id) => {
    console.log(`Clicked`);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://hitprojback.hasthiya.org/api/HIT/allProjects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const responseData = await response.json();

      // Check if responseData has the expected structure
      if (
        !responseData.status ||
        !responseData.data ||
        !Array.isArray(responseData.data)
      ) {
        throw new Error("Invalid response data format");
      }

      // Define formatDate function to format ISO date string to readable format
      const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true, // Enable 12-hour clock with AM/PM
        });
        return `${formattedDate} ${formattedTime}`; // Combine date and time
      };

      // Map the response data to the required fields
      const mappedData = responseData.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        start_date: formatDate(item.start_date),
        end_date: formatDate(item.end_date),
        status: item.status,
      }));

      // Update the state with the mapped data
      setData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    // Display a confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this project!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      // Check if the user confirmed the deletion
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://hitprojback.hasthiya.org/api/HIT/deleteProjectById/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete project");
          }
          // Remove the deleted project from the state
          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData);
          Swal.fire("Deleted!", "Your project has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting project:", error);
          Swal.fire("Error!", "Failed to delete project.", "error");
        }
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "start_date", headerName: "Start Date", flex: 1 },
    { field: "end_date", headerName: "End Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1.2 },
    {
      headerName: "Actions",
      flex: 0.7,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View">
            <Link to={`/project/viewproject/${params.row.id}`}>
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/project/editproject/${params.row.id}`}>
              <IconButton>
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

  const getRowClassName = (params) => {
    return "row-divider";
  };

  return (
    <Box m="20px">
      <Header
        title="Project Logs"
        subtitle="All the saved projects in the system."
      />

      <Box
        m="0 0 0 0"
        height="55vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "14px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.green[300],
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
            backgroundColor: colors.blueAccent[900],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.green[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .row-divider": {
            borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowClassName={getRowClassName}
        />
      </Box>
    </Box>
  );
};

export default FormsUser;
