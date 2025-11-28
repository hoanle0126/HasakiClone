import React from "react";

const scrollbar = (theme) => {
  return {
    width: "8px",
    height: "8px",
    "&-track": {
      borderRadius: "4px",
    },
    "&-thumb": {
      borderRadius: "4px",
      backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main} , ${theme.palette.primary.dark})`,
      "&:hover": {
        background: theme.palette.primary.dark,
      },
    },
  };
};

export default scrollbar;
