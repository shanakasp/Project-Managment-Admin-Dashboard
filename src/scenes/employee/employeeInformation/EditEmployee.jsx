import ImageIcon from "@mui/icons-material/Image";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const EditEmployee = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("accessToken");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `https://hitprojback.hasthiya.org/api/HIT/allUsers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        const employee = data.data.find((emp) => emp.id === parseInt(id));
        if (employee) {
          setEmployeeData(employee);
          setSelectedStartDate(new Date(employee.startDate));
          setSelectedEndDate(new Date(employee.endDate));
          setPreviewImage(employee.imageUrl);
        } else {
          console.error("Employee not found");
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [id, token]);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("university", values.university);
    formData.append("earlier_company", values.company);
    formData.append("image", values.image);

    try {
      const response = await axios.put(
        `https://hitprojback.hasthiya.org/api/HIT/updateUserById/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setAlertMessage("Employee Updated successfully!");
      setAlertSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/employee"), 3000);
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("An error occurred while updating the employee.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header
        title={`EDIT EMPLOYEE ID ${id}`}
        subtitle="Edit Employee Details"
      />

      {employeeData && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{
            name: employeeData.name || "",
            university: employeeData.university || "",
            company: employeeData.earlier_company || "",
            image: null,
          }}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <Typography variant="h6">Name of the Employee</Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4", mt: "-20px" }}
                />
                <Typography variant="h6">Employee University</Typography>
                <TextField
                  fullWidth
                  multiline
                  variant="filled"
                  rows={2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.university}
                  name="university"
                  error={!!touched.university && !!errors.university}
                  helperText={touched.university && errors.university}
                  sx={{ gridColumn: "span 4", mt: "-20px" }}
                />
                <Typography variant="h6">Employee Worked Companies</Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company}
                  name="company"
                  sx={{ gridColumn: "span 4", mt: "-20px" }}
                />

                <Box sx={{ gridColumn: "span 2" }}>
                  <label htmlFor="image-upload">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                      style={{ display: "none" }}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      color="secondary"
                      startIcon={<ImageIcon />}
                    >
                      Change Employee Image
                    </Button>
                  </label>
                </Box>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ width: 200, height: 200, gridColumn: "span 4" }}
                  />
                )}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {" "}
                  <strong>
                    {loading ? "Updating..." : "Update Employee Details"}
                  </strong>
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity={alertSeverity}
          elevation={6}
          variant="filled"
          sx={{ color: "#fff" }}
        >
          {alertSeverity === "success" ? "Success" : "Error"}
          <br />
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name of the employee is required"),
  university: yup.string().required("Employee Learned University is required"),
});

export default EditEmployee;
