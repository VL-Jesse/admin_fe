import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IFormDialog } from "./types";
import { useStyles } from "./styles";

export const FormDialog = ({ open, validateAction }: IFormDialog) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => validateAction(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure yo want to delete this item?
        </DialogTitle>
        <DialogActions className={classes.spaceBetween}>
          <Button
            onClick={() => validateAction(false)}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => validateAction(true)}
            color="inherit"
            variant="contained"
            className={classes.cancelButton}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
