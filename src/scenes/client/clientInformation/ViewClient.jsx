import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const Viewclient = () => {
  const { id } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header
        title={`VIEW CLIENT ID ${id}`}
        subtitle="View Each Client Details"
      />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Client Name
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Client Name: Sample Client Name goes here.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Client Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Client Description: Sample Client description goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Country
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Client's Country: Sample Client Country goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Added Date
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Added Date: Sample added date goes here.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Company LOGO
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Image: Sample image details go here.</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Viewclient;
