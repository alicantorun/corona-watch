import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import store from "./App/store";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "./App/theme/defaultTheme";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
