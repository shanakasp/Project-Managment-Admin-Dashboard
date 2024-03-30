import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const EditProjectDetails = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    title: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setValues({ ...values, image: file });
  };

  const handleUpdate = () => {
    // Add logic to update project details with API call or state management
    console.log("Updated project details:", values);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header title={`EDIT PROJECT ID ${id}`} subtitle="Edit Project Details" />

      <Box mt="20px">
        <Typography variant="h6">Edit Project Title:</Typography>
        <TextField
          fullWidth
          variant="filled"
          label="Project Title"
          value={values.title}
          name="title"
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <Typography variant="h6" sx={{ mt: 4 }}>
          Edit Project Description:
        </Typography>
        <TextField
          fullWidth
          multiline
          variant="filled"
          rows={6}
          label="Description"
          onChange={handleChange}
          value={values.description}
          name="description"
          sx={{ gridColumn: "span 4", mt: 2 }}
        />
        <Typography variant="h6" sx={{ mt: 4 }}>
          Edit Start and End Dates:
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={values.startDate}
          name="startDate"
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={values.endDate}
          name="endDate"
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Select New Image:
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          sx={{ mt: 4 }}
        />{" "}
        <br></br>
        {values.image && (
          <img
            src={URL.createObjectURL(values.image)}
            alt="Selected Image"
            style={{ marginTop: "2px", height: "30vh", width: "auto" }}
          />
        )}
        <Box display="flex" justifyContent="end" mb="20px">
          <Button type="submit" color="primary" variant="contained">
            Update Project Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProjectDetails;
