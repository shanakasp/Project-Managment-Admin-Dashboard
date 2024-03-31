import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const ViewProject = () => {
  const { id } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header
        title={`VIEW PROJECT ID ${id}`}
        subtitle="View Each Project Details"
      />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Project Title
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Project Title: Sample project title goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Project Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Project Description: Sample project description goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Start Date
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Start Date: Sample start date goes here.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            End Date
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>End Date: Sample end date goes here.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Image
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Image: Sample image details go here.</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ViewProject;
