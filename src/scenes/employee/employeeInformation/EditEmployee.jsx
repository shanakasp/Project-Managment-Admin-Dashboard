import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
const EditClient = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
  const handleFormSubmit = (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append("name", values.name);

    formData.append("university", values.description);

    formData.append("company", values.company);
    formData.append("image", values.image);

    fetch("http://hitprojback.hasthiya.org/api/HIT/client", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header
        title={`EDIT EMPLOYEE ID ${id}`}
        subtitle="Edit Employee Details"
      />

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
                    change employee image
                  </Button>
                </label>
              </Box>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: 200, height: 200, marginLeft: "-95%" }}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Client Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name of the employee is required"),

  university: yup.string().required("Employee Learned University is required"),

  // other: yup.string().required("Other is required"),
});

const initialValues = {
  name: "",

  university: "",

  image: null,
};

export default EditClient;
