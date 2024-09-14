import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

// component
import Header from "../../components/CCM/Header";

const MainPage = ({ children }) => {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#002746",
      },
    },
  });
  theme = responsiveFontSizes(theme);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // eslint-disable-next-line no-nested-ternary
  const padding = isSmallScreen
    ? "20px 20px"
    : isMediumScreen
    ? "20px 40px"
    : "30px 80px";
  const marginTop = "0px";

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        component="main"
        sx={{
          padding,
          margin: `${marginTop} 0 0 0`,
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MainPage;
