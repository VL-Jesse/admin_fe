import { makeStyles } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";

export const useStyles = makeStyles(theme =>({
  spaceBetween: {
    justifyContent: "space-between",
  },
  container: {
    display: "grid",
  },
  cancelButton: {
    backgroundColor: defaultColor.orange,
    color: defaultColor.white,
    '&:hover': {
        backgroundColor: defaultColor.orange,
        filter: "brightness(95%)"
      },
  },
  form: {
    display: "grid",
    placeItems: "center start",
    gridTemplateColumns: "repeat(2,1fr)",
    rowGap: 10,
    marginBottom: 20,
    padding:10
  },
  title: {
    color: defaultColor.orange,
    fontWeight: "bold",
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 10,
    margin: 10,
    display: "flex",
    justifyContent: "space-between",
  }
}));