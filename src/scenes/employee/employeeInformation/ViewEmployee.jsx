import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const ViewEmpl = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("accessToken");

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          "https://hitprojback.hasthiya.org/api/HIT/allUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const employeeData = response.data.data.find(
          (emp) => emp.id === parseInt(id)
        );
        setEmployee(employeeData);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id, token]);

  if (!employee) {
    return (
      <Box m="20px">
        {/* <Header title={`VIEW EMPLOYEE ID ${id}`} subtitle="Loading..." /> */}
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header
        title={`VIEW EMPLOYEE ID ${id}`}
        subtitle="View Each Employee Details"
      />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Employee Name
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{employee.name || "N/A"}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Employee University
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{employee.university || "N/A"}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Companies Worked Before
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{employee.earlier_company || "N/A"}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Employee Image
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {employee.imageUrl ? (
            <img
              src={employee.imageUrl}
              alt="Employee"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <Typography>Image not available</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ViewEmpl;
