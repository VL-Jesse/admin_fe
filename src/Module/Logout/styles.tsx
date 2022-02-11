import { makeStyles } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 200,
  },
  header: {
    placeItems: "center",
    marginBottom: 20
  },
  paper: {
    width: 400,
    padding: 20,
    height: 400
  },
  background: {
    backgroundColor: defaultColor.darkBlue,
    minHeight: '100vh'
  },
  linkText: {
    fontWeight: "bold",
  },
});
