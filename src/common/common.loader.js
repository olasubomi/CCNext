import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

export const Loader = (props) => {
  return (
    <div>
      <CircularProgress
        thickness={props.thickness}
        size={props.size}
        color={props.color}
      />
    </div>
  );
};
