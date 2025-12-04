"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a",
      paper: "#292929",
    },
    text: {
      primary: "#EBEBEB",
      secondary: "#A6A6A6",
    },
    grey: {
      "500": "#505050",
    },
    primary: {
      main: "#4C88FF",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: [
      "var(--font-noto-sans-tc)", // Use the CSS variable from Next.js
      "Noto Sans TC",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),

    body1: {
      fontSize: "14px",
      lineHeight: "22px",
      fontWeight: 400,
    },
    h1: {
      fontSize: "20px",
      lineHeight: "28px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: 500,
    },
    body2: {
      fontSize: "14px",
      lineHeight: "22px",
      fontWeight: 400,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingTop: "12px",
          paddingBottom: "12px",
          borderBottom: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
