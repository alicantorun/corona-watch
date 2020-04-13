import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import store from "./App/store";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./ThemeContextProvider";

import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

ReactDOM.render(
  <Suspense fallback={null}>
    <Provider store={store}>
      <ThemeContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </Provider>
  </Suspense>,

  document.getElementById("root")
);
