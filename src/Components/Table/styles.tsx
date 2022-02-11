import { makeStyles } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";

export const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    marginTop: 10,
  },
  table: {
    padding: 10,
    marginTop: 10,
  },
  title: {
    color: defaultColor.orange
  }
});
