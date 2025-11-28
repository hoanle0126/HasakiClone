import { MuiTheme } from "@/theme";
import { Box, GlobalStyles, useTheme } from "@mui/material";
import React from "react";

const GlobalStyle = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        h1: theme.typography.h1,
        h2: theme.typography.h6,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        p: theme.typography.body2,
        "ul,ol": {
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: "400",
          letterSpacing: 0,
        },
        li: {
          marginBottom: "12px",
          marginTop: "12px",
          marginLeft: "40px",
        },
        ul: {
          listStyleType: "disc",
        },
        ol: {
          listStyleType: "decimal",
        },
        "& .MuiInputBase-input:focus": {
          boxShadow: "none",
        },
        img: {
          width: 800,
          height: 800,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default GlobalStyle;
