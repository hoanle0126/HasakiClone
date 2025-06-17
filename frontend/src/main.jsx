import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { MainRouter } from "@/router";
import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={MuiTheme}>
      <RouterProvider router={MainRouter} />
    </ThemeProvider>
  </StrictMode>
);
