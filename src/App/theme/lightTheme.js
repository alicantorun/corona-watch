import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    background: {
      default: "#000",
    },
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  overrides: {
    MuiDivider: {
      root: {
        height: 2,
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
