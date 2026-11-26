import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { triggerAlert } from "../actions/Common";

export function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    props.resetSnack(false);
  };

  React.useEffect(() => {
    setOpen(props.showSnack);
  }, [props.showSnack]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={props.message}
        action={action}
        ContentProps={{
          sx: {
            background: "red",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{ "@media (max-width: 600px)": { left: "12px", right: "12px", bottom: "calc(80px + env(safe-area-inset-bottom, 0px))" } }}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    resetSnack: (showSnack, snackMessage) =>
      dispatch(triggerAlert({ snackMessage, showSnack })),
  };
}

function mapStateToProp(state) {
  return {
    path: state.Common.path,
    auth: state.Auth,
    showSnack: state.showSnack,
    snackMessage: state.snackMessage,
    snackDuration: state.snackDuration,
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(SimpleSnackbar);
