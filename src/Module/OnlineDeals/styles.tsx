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
  formDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  form: {
    display: "grid",
    placeItems: "center start",
    gridTemplateColumns: "repeat(2,1fr)",
    rowGap: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  header: {
    placeItems: "center",
    marginBottom: "3%",
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
  buttomBack: {
    margin: 20
  }
});
