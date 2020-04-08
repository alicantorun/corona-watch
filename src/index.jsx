import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import store from "./App/store";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "./App/theme/defaultTheme";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
