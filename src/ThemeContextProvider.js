// @flow

import React, { Fragment, Component, createContext } from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";

import lightTheme from "./App/theme/lightTheme";
import darkTheme from "./App/theme/darkTheme";

const { Provider, Consumer } = createContext();

class ThemeContextProvider extends Component<Props, State> {
  state = {
    isDarkThemeActivated: null,
  };

  async componentDidMount() {
    // const isFirstTimeRunningApp = await getItemFromStorage(
    //   CONSTANTS.KEYS.FIRST_TIME_RUNNING_APP,
    //   false
    // );

    // if (typeof isFirstTimeRunningApp === "boolean") {
    //   this.setState({
    //     isDarkThemeActivated: true,
    //   });

    //   return;
    // }

    // const appThemeFromStorage = await getItemFromStorage(
    //   CONSTANTS.KEYS.APP_THEME,
    //   false
    // );

    // const isDarkThemeActivated = appThemeFromStorage === "true";

    this.setState({
      isDarkThemeActivated: true,
    });
  }

  onToggleDarkTheme = async (): void => {
    const { isDarkThemeActivated } = this.state;

    this.setState({
      isDarkThemeActivated: !isDarkThemeActivated,
    });

    // await persistItemInStorage(CONSTANTS.KEYS.APP_THEME, !isDarkThemeActivated);
    // await persistItemInStorage(CONSTANTS.KEYS.FIRST_TIME_RUNNING_APP, true);
  };

  getAppTheme = () => {
    const { isDarkThemeActivated } = this.state;

    const themeSelected = isDarkThemeActivated ? darkTheme : lightTheme;

    // return {
    //   ...appStyles,
    //   colors: {
    //     ...appStyles.colors,
    //     ...themeSelected,
    //   },
    // };
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
