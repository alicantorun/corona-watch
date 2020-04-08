import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import store from "./App/store";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./ThemeContextProvider";

import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeContextProvider>
  </Provider>,
  document.getElementById("root")
);
