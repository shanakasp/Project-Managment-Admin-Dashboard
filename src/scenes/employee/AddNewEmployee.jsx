import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Header from "../../components/Header";

const Form = () => {
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

  const initialValues = {};

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    university: yup.string().required("University is required"),
    earlier_company: yup.string().required("Earlier Company is required"),
    image: yup.mixed().required("Image is required"),
  });

  const handleFormSubmit = (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("university", values.university);
    formData.append("earlier_company", values.earlier_company);
    formData.append("image", values.image);

    fetch("http://hitprojback.hasthiya.org/api/HIT/user", {
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
        title="CREATE EMPLOYEE"
        subtitle="Create a New Employee Profile"
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
            <Box display="grid" gap="30px">
              <TextField
                fullWidth
                variant="filled"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                sx={{ gridColumn: "span 4" }}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                variant="filled"
                label="University"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.university}
                name="university"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.university && !!errors.university}
                helperText={touched.university && errors.university}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Earlier Company"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.earlier_company}
                name="earlier_company"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.earlier_company && !!errors.earlier_company}
                helperText={touched.earlier_company && errors.earlier_company}
              />

              <label htmlFor="image-upload">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  startIcon={<ImageIcon />}
                >
                  Select Image
                </Button>
              </label>

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: 200, height: 200, marginLeft: "-25%" }}
                />
              )}
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" variant="contained" color="secondary">
                Create New Employee
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
