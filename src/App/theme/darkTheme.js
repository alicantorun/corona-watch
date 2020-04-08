import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    background: {
      default: "#17223b",
      paper: "#263859",
    },
    type: "dark",
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
});
theme = responsiveFontSizes(theme);
export default theme;

/*
Palette
17223b
263859
6b778d
ff6768
*/
