import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const ViewEmpl = () => {
  const { id } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          <Typography>
            Employee Name: Sample Employee Name goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Employee University
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Employee University: Sample Employee University goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Companies Worked Before
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Companies Worked Before: Sample Companies Worked Before goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Employee Image
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Image: Sample image goes here.</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ViewEmpl;
