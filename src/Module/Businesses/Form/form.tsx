import {
  Button,
  FormControl,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useForm,  } from "react-hook-form";
import { IoReturnDownBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { Sidebar } from "../../../Components/Sidebar";
import {  IFormPut, ILocationParams } from "../../../interface/businessTypes";
import { clearEditBusiness } from "../../../Reducer/businessReducer";
import { path } from "../../../Routes/path";
import { useQuery } from "../../../utils/getQuery";
import { useStyles } from "../styles";
import { FormContact } from "./formContact";
import { FormDeals } from "./formDeals";
import { FormDetails } from "./formDetails";
import { Notification } from "../../../Components/Notification";
import { useEffect, useState } from "react";
import { Location } from "../../../Components/Location";
import { addBusinessSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBusiness, getEditBusiness, updateBusiness } from "../../../Actions/businessAction";


export const FormBusinesses = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const id = useQuery(search, "id");
  const selectedData = useAppSelector((state: RootState) => state.business);
  const [address, setAddress] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
    setValue,
  } = useForm({ defaultValues: { ...(selectedData.edit as IFormPut) }, resolver: yupResolver(addBusinessSchema)});
 

  useEffect(() => {
    if (location.pathname === path.BUSINESSESEDIT && !id) {
      return navigate(path.USER);
    }
    if (id) dispatch(getEditBusiness(id));
  }, []);

  useEffect(() => {
    if (!selectedData.edit) return;
    reset(selectedData.edit);
  }, [selectedData.edit]);

  const validateLocation = (data: IFormPut) => {
    const location = data.AddressModels[0].location
    if(!location.latitude || location.longitude) 
    return false
  }

  const onSubmit = async (data: IFormPut) => {
    if(validateLocation(data)) return 
    if (location.pathname === path.BUSINESSESCREATE) {
      const responsePost: any = await dispatch(createBusiness(data));
      if (responsePost!.payload!.success) {
        Notification({
          title: "Success",
          message: "Business created",
          type: "success",
        });
        return navigate(path.BUSINESSES);
      }
    }
    if (location.pathname === path.BUSINESSESEDIT) {
      const responsePut: any = await dispatch(
        updateBusiness(data)
      );
      if (responsePut!.payload!.status === 200) {
        Notification({
          title: "Success",
          message: "Business edited",
          type: "success",
        });
        return navigate(path.BUSINESSES);
      }
    }
  };

  const backHandler = () => {
    dispatch(clearEditBusiness());
    navigate(path.BUSINESSES);
  };

  const locationHandle = (location: ILocationParams) => {
    console.log({location})
  }

  return (
    <Sidebar>
      <Grid container className={classes.formDiv}>
        <Paper variant="elevation" elevation={3} className={classes.paper}>
          <Typography variant="h4" className={classes.title}>
            Business Details
          </Typography>
          <Grid container className={classes.form}>
            <Typography variant="subtitle1"> Quick address search: </Typography>
            <FormControl fullWidth>
            <Location address={address} setAddress={setAddress} locationHandle={locationHandle}/>
            </FormControl>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormDetails
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />
            <Typography variant="h5" className={classes.title}>
              Contact information
            </Typography>
            <FormContact
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
            />
            <Typography variant="h5" className={classes.title}>
              Deals
            </Typography>
            <FormDeals register={register} errors={errors} control={control} setValue={setValue}/>
            <Typography variant="h5" className={classes.title}>
              Assets
            </Typography>
            <Grid className={classes.form}>
            <Typography variant="subtitle1"> Cover Photo: </Typography>
            <Button variant="outlined" color="secondary">
              Browse
            </Button>
            </Grid>

            <Button variant="contained" color="primary" type="submit" className={classes.margiButton}>
            {location.pathname === path.BUSINESSESCREATE ? "Add": "Edit"} Business
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
