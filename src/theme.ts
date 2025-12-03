"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: '#0a0a0a',
      // default: "#ffffff",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#A6A6A6",
    },
    primary: {
      main: "#1976d2",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
    },
    action: {
      hover: "rgba(255, 255, 255, 0.12)",
      selected: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.3)",
    },
  },
  typography: {
    fontFamily: [
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
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "14px",
      lineHeight: "22px",
      fontWeight: 500,
    },
  },
  spacing: 8, // Base spacing unit (8px)
  shape: {
    borderRadius: 4,
  },
});

export default theme;
