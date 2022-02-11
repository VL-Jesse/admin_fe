import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IFormDialog } from "./types";

export const FormDialog = ({
  open,
  validateAction,
}: IFormDialog) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => validateAction(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Are you sure yo want to delete this item?</DialogTitle>
        <DialogActions>
          <Button onClick={() => validateAction(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={() => validateAction(true)} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
