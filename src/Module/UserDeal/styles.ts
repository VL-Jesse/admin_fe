import { makeStyles } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";

export const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    marginTop: 10,
  },
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  paper: {
    width: 800,
    padding: "5%",
  },
  title: {
    color: defaultColor.orange
  },
  iconButton: {
    justifyContent: "space-between",
  },
});
