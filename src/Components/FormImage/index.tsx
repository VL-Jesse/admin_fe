import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IFormImage, IFormImageData } from "./types";
import { useStyles } from "./styles";
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography } from "@material-ui/core";
import { postPhotoService } from "../../service/uploadPhoto";
import { Notification } from "../../Components/Notification";
import { yupResolver } from "@hookform/resolvers/yup";
import { photoSchema } from "./validation";

export const FormImage = ({ open, setOpen, service, setUrl }: IFormImage) => {
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ defaultValues: { description: "", file: null } , resolver: yupResolver(photoSchema) });

  const onSubmit = async (form: { description: string; file: any }) => {
    const type = form.file[0].type as string;
    if (!type.includes("image")) return;
    const newExtension = type.replace("image/", "") as string;
    const convertedFile = await convertToBase64(form.file[0]);
    const data: IFormImageData = {
      extension: newExtension,
      description: form.description,
      file: convertedFile as any,
      service,
    };
    const response = await postPhotoService(data);
    if (response.Location) {
      setUrl(response.Location);
      Notification({
        title: "Success",
        message: "Upload photo",
        type: "success",
      });
      return setOpen(false);
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload photo</DialogTitle>
        <DialogActions className={classes.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className={classes.form}>
              <Typography variant="subtitle1">Description</Typography>
              <TextField
                fullWidth
                variant={"outlined"}
                error={!!errors["description"]}
                {...register("description")}
                helperText={errors["description"]?.message}
              />
              <Typography variant="subtitle1">Photo</Typography>
              <input
                color="primary"
                accept="image/*"
                type="file"
                {...register("file")}
                required
              />
            </Grid>
            <Grid className={classes.buttonContainer}>
            <Button
                onClick={() => setOpen(false)}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="inherit"
                variant="contained"
                className={classes.cancelButton}
              >
                Submit
              </Button>

            </Grid>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
};
