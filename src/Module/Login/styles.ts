import { makeStyles } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 200,
  },
  form: {
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "repeat(1,1fr)",
    rowGap: 20,
  },
  header: {
    placeItems: "center",
    marginBottom: 20
  },
  paper: {
    width: 400,
    padding: 20,
    height: 450
  },
  background: {
    backgroundColor: defaultColor.darkBlue,
    minHeight: '100vh'
  },
  button: {
    marginTop:20
  }
});
