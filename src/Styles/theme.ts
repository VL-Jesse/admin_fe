import { createTheme } from '@material-ui/core';
import { defaultColor } from './defaultStyles'
export const theme = createTheme({
  palette: {
    primary: {
      main: defaultColor.darkBlue
    },
    secondary: {
      main: defaultColor.darkGray
    },
    text:{
      secondary: defaultColor.darkGray,
    },
  },
  props: {
    MuiInputBase: {
      margin: 'dense',
    },
  },
});