import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography, alpha, useTheme } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";

const Topbar = ({}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.primary[400]}
    >
      <Box display="flex" borderRadius="3px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            alt="profile-user"
            width="50px"
            height="50px"
            src={`../../assets/user.png`}
            style={{ cursor: "pointer", borderRadius: "20%" }}
          />
        </Box>{" "}
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "10px " }}
        >
          Hasthiya IT
        </Typography>
      </Box>

      <Link
        to={"/"}
        onClick={() => {
          localStorage.removeItem("accessToken");
        }}
      >
        <Button
          color="inherit"
          startIcon={<ExitToApp />}
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textTransform: "none",
            color: alpha(colors.grey[300], 0.8),
          }}
        >
          Log Out
        </Button>
      </Link>
    </Box>
  );
};

export default Topbar;
