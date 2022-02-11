import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { message } from "../../../utils/message";
import { useStyles } from "../styles";
import { IFormParams, IObjectState, IObjectType } from "../../../interface/businessTypes";
import { Controller } from "react-hook-form";
import { Schedule } from "../../../Components/Schedule";
import { businessType } from "../../../utils/businessTypeName";
import { v4 as uuidv4 } from "uuid";
import { stateName } from "../../../utils/stateName";

export const FormDetails = ({ register, errors, control, setValue }: IFormParams) => {
  const classes = useStyles();

  return (
    <Grid >
    <Grid container className={classes.form}>
      <Typography variant="subtitle1"> Name: </Typography>
      <TextField
        fullWidth
        variant={"outlined"}
        error={!!errors["BusinessName"]}
        {...register("BusinessName")}
        helperText={errors["BusinessName"]?.message}
      />
      <Typography variant="subtitle1"> Address: </Typography>
      <TextField
        fullWidth
        error={!!errors.AddressModels?.[0]?.addressLine}
        variant={"outlined"}
        {...register("AddressModels[0].addressLine")}
        helperText={errors.AddressModels?.[0]?.addressLine?.message}
      />
      <Typography variant="subtitle1"> City: </Typography>
      <TextField
        fullWidth
        variant={"outlined"}
        error={!!errors.AddressModels?.[0]?.city}
        helperText={errors.AddressModels?.[0]?.city?.message}
        {...register("AddressModels[0].city")}
      />
      <Typography variant="subtitle1"> State: </Typography>
      <FormControl fullWidth error={!!errors.AddressModels?.[0]?.state}>
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              variant={"outlined"}
              displayEmpty
              value={`${field.value}`}
            >
              <MenuItem disabled value={undefined}>Select </MenuItem>
              {stateName.map((type: IObjectState)=>{
                return <MenuItem value={type.abbr} key={uuidv4()}>{type.name}</MenuItem>
              })}
            </Select>
          )}
          control={control}
          name="AddressModels[0].state"
        />
        <FormHelperText>
          {errors.AddressModels?.[0]?.state?.message}
        </FormHelperText>
      </FormControl>
      <Typography variant="subtitle1"> Zip Code: </Typography>
      <TextField
        fullWidth
        variant={"outlined"}
        error={!!errors.AddressModels?.[0]?.zipCode}
        {...register("AddressModels[0].zipCode")}
        helperText={errors.AddressModels?.[0]?.zipCode?.message}
      />
      <Typography variant="subtitle1"> Business Type: </Typography>
      <FormControl fullWidth error={!!errors["Category"]}>
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              variant={"outlined"}
              displayEmpty
              value={`${field.value}`}
            >
              <MenuItem disabled value={undefined}>Select </MenuItem>
              {businessType.map((type: IObjectType)=>{
                return <MenuItem value={type.value} key={uuidv4()}>{type.name}</MenuItem>
              })}
            </Select>
          )}
          control={control}
          name="Category"
        />
        <FormHelperText>
          {errors["Category"]?.message}
        </FormHelperText>
      </FormControl>
      <Typography variant="subtitle1"> Business description: </Typography>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        minRows={4}
        variant={"outlined"}
        error={!!errors["Description"]}
        {...register("Description")}
        helperText={errors["Description"]?.message}
      />
      <Typography variant="subtitle1"> Website URL: </Typography>
      <TextField
        fullWidth
        type={"url"}
        variant={"outlined"}
        error={!!errors["WebsiteUrl"]}
        {...register("WebsiteUrl")}
        helperText={errors["WebsiteUrl"]?.message}
      />
      <Typography variant="subtitle1"> Reservation URL: </Typography>
      <TextField
        fullWidth
        type={"url"}
        variant={"outlined"}
        error={!!errors["ReservationUrl"]}
        {...register("ReservationUrl")}
        helperText={errors["ReservationUrl"]?.message}
      />
      <Typography variant="subtitle1"> Hours: </Typography>
    </Grid>
     <Schedule register={register} errors={errors} control={control} setValue={setValue}/>
     </Grid>
  );
};
