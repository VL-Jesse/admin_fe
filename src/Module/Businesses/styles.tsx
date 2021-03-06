import { makeStyles } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";

export const useStyles = makeStyles(theme =>({
  container: {
    justifyContent: "center",
    marginTop: 10,
  },
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
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
    color: defaultColor.orange,
    fontWeight: "bold",
    marginTop: 10
  },
  iconButton: {
    justifyContent: "space-between",
  },
  subtitle: {
    color: defaultColor.orange,
    fontWeight: "bold",
    textAlign: "left",
  },
  margiButton:{
    marginTop: 20
  },
  buttomBack: {
    margin: 20
  },
  imageContainer: {
    overflow: "hidden",
    maxHeight: 400,
    maxWidth: 400,
    minWidth: 100,
    minHeight: 100
  },
  paperImage: {
    display: "inline-flex",
    justifyContent: "center",
    margin: 20,
    maxHeight: 400,
    maxWidth: 400,
    minWidth: 100,
    minHeight: 100
  }
}));