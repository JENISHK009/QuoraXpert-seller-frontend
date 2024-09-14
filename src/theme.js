import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Changed to light mode for a fresher look
    primary: {
      main: "red", // A vibrant purple
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#03dac6", // A teal color for accents
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    error: {
      main: "#b00020", // A deeper red for errors
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Changed to Poppins for a modern look
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.875rem",
      color: "#6e6e6e", // Slightly darker for better readability
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "10px",
    //       // padding: "10px 20px",
    //       boxShadow:
    //         "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
    //     },
    //     containedPrimary: {
    //       backgroundColor: "#6200ea",
    //       "&:hover": {
    //         backgroundColor: "#3700b3",
    //       },
    //     },
    //   },
    // },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#6200ea",
          color: "#ffffff",
        },
      },
    },
  },
});

export default theme;
