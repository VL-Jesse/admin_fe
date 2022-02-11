import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme =>({
  container: {
    justifyContent: "center",
    marginTop: 10,
  },
  timeForm: {
    display: "grid",
    textAlign: "left",
    placeItems: "space-between",
    gridTemplateColumns: "repeat(2,1fr)",
  },
  hoursDiv: {
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "repeat(3,1fr)",
  },
}));