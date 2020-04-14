import React from "react";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

import ChatIcon from "@material-ui/icons/Chat";
import FaceIcon from "@material-ui/icons/Face";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: 0,
    borderBottomRightRadius: theme.spacing(0.5),
    borderBottomLeftRadius: theme.spacing(0.5),
    top: "auto",
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
  },
  inputContainer: {
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    borderRadius: theme.shape.borderRadius,
    borderColor: fade(theme.palette.common.white, 0.25),
    border: "1px solid",
    marginLeft: theme.spacing(1),
    position: "relative",
    width: "100%",
  },
  icon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    width: "100%",
  },
  iconButton: { marginLeft: theme.spacing(1), marginRight: theme.spacing(1) },
}));

export default function BottomBar(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Box display="flex" padding={1}>
        <div className={classes.inputContainer} style={{ maxWidth: "140px" }}>
          <div className={classes.icon}>
            <FaceIcon />
          </div>
          <InputBase
            onChange={props.handleName}
            value={props.name}
            placeholder="Name"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <div className={classes.inputContainer}>
          <form onSubmit={props.handleSubmit}>
            <div className={classes.icon}>
              <ChatIcon />
            </div>
            <InputBase
              onChange={props.handleContent}
              value={props.content}
              placeholder="Your message..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </form>
        </div>
        <IconButton
          onClick={props.handleSubmit}
          className={classes.iconButton}
          size="small"
        >
          <SendIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </AppBar>
  );
}
