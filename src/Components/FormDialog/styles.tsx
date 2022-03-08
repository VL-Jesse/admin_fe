import { makeStyles } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";

export const useStyles = makeStyles((theme) => ({
  spaceBetween: {
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: defaultColor.orange,
    color: defaultColor.white,
    "&:hover": {
      backgroundColor: defaultColor.orange,
      filter: "brightness(95%)",
    },
  },
}));
