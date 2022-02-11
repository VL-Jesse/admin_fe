import {
    Grid,
    TextField,
    Typography,
  } from "@material-ui/core";
  import { useStyles } from "../styles";
import { IFormParams } from "../../../interface/businessTypes";

  export const FormContact = ({register, errors}: IFormParams) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.form}>
            <Typography variant="subtitle1"> Name: </Typography>
            <TextField
              fullWidth
              variant={"outlined"}
              error={!!errors["ContactName"]}
              {...register("ContactName")}
              helperText={errors["ContactName"]?.message}
            />
            <Typography variant="subtitle1"> Email: </Typography>
            <TextField
              fullWidth
              type={"email"}
              variant={"outlined"}
              error={!!errors["ContactEmail"]}
              {...register("ContactEmail")}
              helperText={errors["ContactEmail"]?.message}
            />
            <Typography variant="subtitle1"> Phone Number: </Typography>
            <TextField
              fullWidth
              variant={"outlined"}
              error={!!errors["ContactPhone"]}
              {...register("ContactPhone")}
              helperText={errors["ContactPhone"]?.message}
            />
        </Grid>
    );
  };
  