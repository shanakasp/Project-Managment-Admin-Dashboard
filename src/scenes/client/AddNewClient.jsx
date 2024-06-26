import ImageIcon from "@mui/icons-material/Image";
import {
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header";
import { countries } from "../../data/country";
import { tokens } from "../../theme";
const Form = () => {
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
  const navigate = useNavigate();

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

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("country", values.country);
      formData.append("description", values.description);
      formData.append("add_date", values.add_date);
      formData.append("other", values.other);
      formData.append("image", values.image);

      const response = await fetch(
        "http://hitprojback.hasthiya.org/api/HIT/client",
        {
          method: "POST",
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
        setAlertMessage("Client added successfully!");
        setOpenSnackbar(true);

        setPreviewImage(null);
        setTimeout(() => {
          navigate("/client");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setAlertSeverity("error");
        setAlertMessage("Failed to add client: " + errorData.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertSeverity("error");
      setAlertMessage("Failed to add client: " + error.message);
      setOpenSnackbar(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header title="CREATE NEW CLIENT" subtitle="Create a New Client" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
          isSubmitting,
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
              <Box sx={{ gridColumn: "span 4" }}>
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
                    Select Company Logo
                  </Button>
                </label>
              </Box>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: 200, height: 200 }}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                <strong>Create New Client</strong>
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

const initialValues = {
  name: "",
  country: "",
  description: "",
  add_date: "",
  other: "",
  image: null,
};

export default Form;
