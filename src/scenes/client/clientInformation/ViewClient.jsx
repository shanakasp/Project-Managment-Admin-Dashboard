import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const Viewclient = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [client, setClient] = useState(null);
  const token = localStorage.getItem("accessToken");
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
        setClient(clientData);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClient();
  }, [id]);

  if (!client) {
    return <Typography>Loading...</Typography>;
  }

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
          <Typography>{client.name}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Client Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{client.description}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Country
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{client.country || "N/A"}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Added Date (MM / DD/ YYYY)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {new Date(client.add_date).toLocaleDateString()}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Company LOGO
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {client.imageUrl ? (
            <img
              src={client.imageUrl}
              alt="Company Logo"
              style={{ width: "25%", height: "auto" }}
            />
          ) : (
            <Typography>No image available</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Viewclient;
