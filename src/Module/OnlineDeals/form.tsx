import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Sidebar } from "../../Components/Sidebar";
import {
  IFormPost,
  IOnlineDealEdit,
} from "../../interface/onlineDealsTypes";
import { clearEditOnlineDeal } from "../../Reducer/onlineDealsReducer";
import { path } from "../../Routes/path";
import { useQuery } from "../../utils/getQuery";
import { useStyles } from "./styles";
import { useEffect } from "react";
import { Notification } from "../../Components/Notification";
import { Autocomplete } from "@material-ui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { dealSchema } from "./validation";
import { createOnlineDeals, getBussinessName, getEditOnlineDeal, updateOnlineDeals } from "../../Actions/onlineDealAction";

export const FormOnlineDeals = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const id = useQuery(search, "id");
  const selectedData = useAppSelector((state: RootState) => state.onlineDeals);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    control,
  } = useForm({ defaultValues: { ...(selectedData.edit as IOnlineDealEdit) }, resolver: yupResolver(dealSchema) });

  useEffect(() => {
    dispatch(getBussinessName());
    if (location.pathname === path.USEREDIT && !id) {
      return navigate(path.USER);
    }
    if (id) dispatch(getEditOnlineDeal(id));
  }, []);

  useEffect(() => {
    if (!selectedData.edit) return;
    reset(selectedData.edit);
  }, [selectedData.edit]);

  const onSubmit = async (data: IOnlineDealEdit | IFormPost) => {
    if (location.pathname === path.ONLINEDEALSCREATE) {
      const responsePost: any = await dispatch(createOnlineDeals(data));
      if (responsePost!.payload!.success) {
        Notification({
          title: "Success",
          message: "Online deal created",
          type: "success",
        });
      }
    }
    if (location.pathname === path.ONLINEDEALSEDIT) {
      const responsePut: any = await dispatch(
        updateOnlineDeals(data as IOnlineDealEdit)
      );
      if (responsePut!.payload!.status === 200) {
        Notification({
          title: "Success",
          message: "Online deal edited",
          type: "success",
        });
      }
    }
    return navigate(path.ONLINEDEALS);
  };

  const backHandler = () => {
    dispatch(clearEditOnlineDeal());
    navigate(path.ONLINEDEALS);
  };

  return (
    <Sidebar>
      <Grid container className={classes.formDiv}>
        <Paper variant="elevation" elevation={3} className={classes.paper}>
          <Grid>
            <Typography variant="h4" className={classes.title}>
              Online Deal Details
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid className={classes.form}>
              <Typography variant="subtitle1"> Business Name: </Typography>
              <FormControl fullWidth >
                <Controller
                  control={control}
                  name="businessName"
                  render={({ field }) =>(
                    <Autocomplete
                      disableClearable
                      {...field}
                      value={field.value ?? ""}
                      onChange={(_, data) => field.onChange(data)}
                      getOptionLabel={(option) => option}
                      options={selectedData.businessNames ?? []}
                      renderInput={(params) => 
                          <TextField
                          error={!!errors["businessName"]}
                          helperText={errors["businessName"]?.message}
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                            variant="outlined"
                          />
                      }
                    />
                  )}
                />
              </FormControl>
              <Typography variant="subtitle1"> Online Deal: </Typography>
              <TextField
                fullWidth
                error={!!errors["title"]}
                variant={"outlined"}
                {...register("title")}
                helperText={errors["title"]?.message}
              />
              <Typography variant="subtitle1"> Use Promo Code: </Typography>
              <TextField
                fullWidth
                variant={"outlined"}
                error={!!errors["promoCode"]}
                helperText={errors["promoCode"]?.message}
                {...register("promoCode")}
              />
              <Typography variant="subtitle1"> Disclaimer: </Typography>
              <TextField
                fullWidth
                variant={"outlined"}
                error={!!errors["description"]}
                multiline
                maxRows={4}
                minRows={4}
                helperText={errors["description"]?.message}
                {...register("description")}
              />
              <Typography variant="subtitle1"> Website URL: </Typography>
              <TextField
                fullWidth
                variant={"outlined"}
                error={!!errors["url"]}
                helperText={errors["url"]?.message}
                {...register("url")}
              />
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              {location.pathname === path.ONLINEDEALSCREATE ? "Add" : "Edit"}{" "}
              New Online Deal
            </Button>
          </form>
          <Grid>
            <Button
              variant="text"
              className={classes.buttomBack}
              onClick={() => backHandler()}
              color="secondary"
              startIcon={<IoReturnDownBack />}
            >
              Back to Online Deals
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Sidebar>
  );
};
