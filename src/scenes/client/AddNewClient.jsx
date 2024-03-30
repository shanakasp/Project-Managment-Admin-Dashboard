import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Header from "../../components/Header";
import { countries } from "../../data/country";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleFormSubmit = (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("country", values.country); // Include the selected country in form data
    formData.append("description", values.description);
    formData.append("add_date", values.add_date);
    formData.append("other", values.other);
    formData.append("image", values.image);

    fetch("http://hitprojback.hasthiya.org/api/HIT/client", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
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
                label="Title of the Project"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <Box>
                <Typography>Country</Typography>{" "}
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
                error={!!touched.other && !!errors.other}
                helperText={touched.other && errors.other}
                sx={{ gridColumn: "span 2" }}
              />
              <input
                type="file"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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
