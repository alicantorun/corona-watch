// @flow

import React, { Component, createContext } from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";

import lightTheme from "./App/theme/lightTheme";
import darkTheme from "./App/theme/darkTheme";

const { Provider, Consumer } = createContext();

class ThemeContextProvider extends Component<Props, State> {
  state = {
    isDarkThemeActivated: null,
  };

  async componentDidMount() {
    this.setState({
      isDarkThemeActivated: true,
    });
  }

  onToggleDarkTheme = async (): void => {
    const { isDarkThemeActivated } = this.state;

    this.setState({
      isDarkThemeActivated: !isDarkThemeActivated,
    });
  };

  getIsDarkThemeActivated = () => {
    const { isDarkThemeActivated } = this.state;

    return isDarkThemeActivated;
  };

  getAppTheme = () => {
    const { isDarkThemeActivated } = this.state;

    const themeSelected = isDarkThemeActivated ? darkTheme : lightTheme;

    return themeSelected;
  };

  render() {
    const { isDarkThemeActivated } = this.state;
    const { children } = this.props;

    if (typeof isDarkThemeActivated !== "boolean") {
      return null;
    }

    const appTheme = this.getAppTheme();

    return (
      <Provider
        value={{
          onToggleDarkTheme: this.onToggleDarkTheme,
          isDarkThemeActivated,
        }}
      >
        <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>
      </Provider>
    );
  }
}

export { ThemeContextProvider };

export default Consumer;
