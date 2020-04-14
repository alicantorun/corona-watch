import React from "react";
import config from "../../../config";
import io from "socket.io-client";
import { withTranslation } from "react-i18next";

import { Paper, Grid, Box } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

import BottomBar from "../BottomBar/BottomBar";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: "",
      name: "",
    };
  }

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Load the last 10 messages in the window.
    this.socket.on("init", (msg) => {
      this.setState(
        (state) => ({
          chat: [...state.chat, ...msg.reverse()],
        }),
        this.scrollToBottom
      );
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on("push", (msg) => {
      this.setState(
        (state) => ({
          chat: [...state.chat, msg],
        }),
        this.scrollToBottom
      );
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  //
  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  // When the user is posting a new message.
  handleSubmit(event) {
    // Prevent the form to reload the current page.
    event.preventDefault();

    if (this.state.name === "" || this.state.content === "") {
      alert("Please enter your name and your message");
      return;
    }

    this.setState((state) => {
      // Send the new message to the server.
      this.socket.emit("message", {
        name: state.name,
        content: state.content,
      });

      // Update the chat with the user's message and remove the current message.
      return {
        chat: [
          ...state.chat,
          {
            name: state.name,
            content: state.content,
          },
        ],
        content: "",
      };
    }, this.scrollToBottom);
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  render() {
    return (
      <Grid item xs={12} md={12} lg={4}>
        <Paper
          id="chat"
          style={{ height: 350, minHeight: "100%", position: "relative" }}
        >
          <Box fontSize="h6.fontSize" padding={2}>
            {this.props.t("components.ChatRoom.title")}
          </Box>
          <Box
            style={{
              overflowY: "scroll",
              height: 250,
            }}
          >
            {this.state.chat.map((el, index) => {
              return (
                <Box
                  key={index}
                  padding={2}
                  bgcolor="background.default"
                  borderRadius={3}
                  margin={2}
                >
                  <Typography variant="caption" className="name">
                    <Box fontWeight="fontWeightBold">{el.name}:</Box>
                    <Box fontWeight={500}>{el.content}</Box>
                  </Typography>
                </Box>
              );
            })}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                this.messagesEnd = el;
              }}
            ></div>
          </Box>
          <BottomBar
            nameTitle={this.props.t("components.ChatRoom.name")}
            placeholder={this.props.t("components.ChatRoom.placeholder")}
            content={this.state.content}
            handleContent={this.handleContent.bind(this)}
            handleName={this.handleName.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            name={this.state.name}
          />
        </Paper>
      </Grid>
    );
  }
}

export default withTranslation()(ChatRoom);
