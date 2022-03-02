import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Sidebar } from "../../Components/Sidebar";
import { IEditUser, IUsers } from "../../interface/userTypes";
import { clearEditUser } from "../../Reducer/userReducer";
import { path } from "../../Routes/path";
import { useQuery } from "../../utils/getQuery";
import { useStyles } from "./styles";
import { useEffect } from "react";
import { Notification } from "../../Components/Notification";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserSchema } from "./validation";
import { createUser, getEditData, updateUser } from "../../Actions/userAction";

export const FormUser = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const id = useQuery(search, "id");

  const userSelected = useAppSelector((state: RootState) =>state.user.edit);
  
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm({ defaultValues: { ...userSelected as IEditUser }, resolver: yupResolver(addUserSchema)});
  
  useEffect(()=> {
    if(location.pathname === path.USEREDIT && !id) {
      return navigate(path.USER)
    }
    if(id) dispatch(getEditData(id))
  },[])
  
  useEffect(() => {
    if(!userSelected) return
    reset(userSelected);
  }, [userSelected]);


  const onSubmit = async (data: IUsers | IEditUser) => {
    if (location.pathname === path.USERCREATE) {
      const responsePost: any = await dispatch(createUser(data));
      if (responsePost!.payload!.status) {
        Notification({title: "Success", message:"User created", type: "success"})
        return navigate(path.USER)
      }
    }
    if (location.pathname === path.USEREDIT) {
      const responsePost: any = await dispatch(updateUser(data as IEditUser));
      if (responsePost!.payload!.status) {
        Notification({title: "Success", message:"User edited", type: "success"})
        return navigate(path.USER)
      }
    }
  };

  const backHandler = () => {
    dispatch(clearEditUser());
    navigate(path.USER);
  };

  return (
    <Sidebar>
      <Grid container className={classes.formDiv}>
        <Paper variant="elevation" elevation={3} className={classes.paper}>
          <Grid>
            <Typography variant="h4" className={classes.title}>
              User Details
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid  className={classes.form}>
            <Typography variant="subtitle1"> First Name: </Typography>
            <TextField
              fullWidth
              variant={"outlined"}
              error={!!errors["firstName"]}
              {...register("firstName")}
              helperText={errors["firstName"]?.message}
            />
            <Typography variant="subtitle1"> Last Name: </Typography>
            <TextField
              fullWidth
              error={!!errors["lastName"]}
              variant={"outlined"}
              {...register("lastName")}
              helperText={errors["lastName"]?.message}
            />
            <Typography variant="subtitle1"> Email Address: </Typography>
            <TextField
              fullWidth
              type={"email"}
              variant={"outlined"}
              error={!!errors["email"]}
              helperText={errors["email"]?.message}
              {...register("email")}
            />
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              {location.pathname === path.USERCREATE ? "Add new": "Edit"}  user
            </Button>
          </form>
          <Grid>
            <Button
              className={classes.buttomBack}
              variant="text"
              onClick={() => backHandler()}
              color="secondary"
              startIcon={<IoReturnDownBack />}
            >
              Back to Users
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Sidebar>
  );
};
