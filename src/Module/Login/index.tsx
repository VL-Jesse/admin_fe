import { Grid, Button, Paper, TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { useForm } from "react-hook-form";
import Logo from "../../Image/Date-Night-Blue-Logo.svg";
import { IAuthParams } from "../../interface/authType";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../Routes/path";
import { getToken } from "../../utils/getToken";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation";
import { authLogin } from "../../Actions/authActions";
import { Notification } from "../../Components/Notification";

export const Login = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authToken = getToken();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as IAuthParams,
    resolver: yupResolver(loginSchema)
  });

  useEffect(()=> {
    if(!authToken) return
    navigate(path.HOME)
  },[authToken])
  
  const onSubmit = async (data: IAuthParams) => {
    const response: any = await dispatch(authLogin(data));
    if (response.payload!.isAxiosError) {
      Notification({
        title: "Warning",
        message: "Invalid Credentials",
        type: "warning",
      });
    }
  };
  
  return (
    <Grid container className={classes.background}>
      <Grid container className={classes.container}>
        <Paper variant="elevation" elevation={3} className={classes.paper}>
          <Grid className={classes.header}>
            <img src={Logo} title="DateNight" width="400" height="200" />
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Email"
              variant={"outlined"}
              error={!!errors["email"]}
              {...register("email")}
              helperText={errors["email"]?.message}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Password"
              error={!!errors["password"]}
              type={"password"}
              variant={"outlined"}
              {...register("password")}
              helperText={errors["password"]?.message}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={classes.button}
            >
              Log In
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
