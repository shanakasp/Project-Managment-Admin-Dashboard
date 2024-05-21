import ImageIcon from "@mui/icons-material/Image";
import {
  AlertTitle,
  Box,
  Button,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Header from "../../../components/Header";
import { countries } from "../../../data/country";
import { tokens } from "../../../theme";

const Form = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("accessToken");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    country: "",
    description: "",
    add_date: "",
    other: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          "https://hitprojback.hasthiya.org/api/HIT/allClients",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const clientData = response.data.data.find(
          (client) => client.id === parseInt(id)
        );
        setInitialValues({
          name: clientData.name,
          country: clientData.country,
          description: clientData.description,
          add_date: clientData.add_date.split("T")[0], // Format date for input type="date"
          other: clientData.other,
          image: clientData.imageUrl,
        });
        setPreviewImage(clientData.imageUrl);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClient();
  }, [id]);

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

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("country", values.country);
      formData.append("description", values.description);
      formData.append("add_date", values.add_date);
      formData.append("other", values.other);
      if (values.image && values.image instanceof File) {
        formData.append("image", values.image);
      }

      const response = await fetch(
        `https://hitprojback.hasthiya.org/api/HIT/updateClientById/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAlertSeverity("success");
        setAlertMessage("Client updated successfully!");
        setOpenSnackbar(true);

        setPreviewImage(null);
        setTimeout(() => {
          navigate("/client");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setAlertSeverity("error");
        setAlertMessage("Failed to update client: " + errorData.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertSeverity("error");
      setAlertMessage("Failed to update client: " + error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header title="EDIT CLIENT" subtitle="Edit Client Details" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        enableReinitialize
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                label="Name of the Client"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                multiline
                variant="filled"
                rows={6}
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Add Date (mm/dd/yyyy)"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.add_date}
                name="add_date"
                error={!!touched.add_date && !!errors.add_date}
                helperText={touched.add_date && errors.add_date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Other"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.other}
                name="other"
                sx={{ gridColumn: "span 2" }}
              />
              <Box>
                <Typography>Country</Typography>
                <Select
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Select a country"
                  name="country"
                  error={!!touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                >
                  {countries.map((countryObj) => (
                    <MenuItem
                      key={countryObj.country}
                      value={countryObj.country}
                    >
                      {countryObj.country}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ gridColumn: "span 2", marginLeft: "54%" }}>
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
                    Update Company Logo
                  </Button>
                </label>
              </Box>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: 100, height: 100 }}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                <strong>Update Client</strong>
              </Button>
            </Box>
          </form>
        )}
      </Formik>

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
          <AlertTitle>
            {alertSeverity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name of the client is required"),
  country: yup.string().required("Country is required"),
  description: yup.string().required("Description is required"),
  add_date: yup.date().required("Add Date is required"),
  other: yup.string().required("Other is required"),
  image: yup.mixed().required("Image is required"),
});

export default Form;
