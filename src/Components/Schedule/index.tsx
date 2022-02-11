import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { IFormParams, IHeaderWeek } from "../../interface/businessTypes";
import { Controller } from "react-hook-form";
import { useStyles } from "./styles";
import { weekTitles } from "../../utils/week";
import { v4 as uuidv4 } from "uuid";

export const Schedule = ({ control, setValue, errors }: IFormParams) => {
  const classes = useStyles();

  const weekSchedule = (
    title: string,
    name: any,
    startTime: any,
    endTime: any,
    index: number
  ) => {

    return (
      <Grid className={classes.timeForm} key={uuidv4()}>
        <Grid className={classes.timeForm}>
          <Typography variant="subtitle1"> {title}: </Typography>
          <Controller
            name={name }
            control={control}
            defaultValue={false}
            rules={{ required: false }}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} {...field} />}
                label="Open"
              />
            )}
          />
        </Grid>
        <Grid className={classes.hoursDiv}>
          <Controller
            name={startTime}
            control={control}
            defaultValue={"00:00"}
            render={({ field }) => <TextField type={"time"} {...field} variant="outlined" 
            error={!!errors.AddressModels?.[0]?.workingHours?.[index]?.openTime}
            helperText={errors.AddressModels?.[0]?.workingHours?.[index]?.openTime?.message}/>}
          />
          <Typography variant="subtitle1"> To </Typography>
          <Controller
            name={endTime}
            control={control}
            defaultValue={"00:00"}
            render={({ field }) => <TextField type={"time"} {...field} variant="outlined" 
            error={!!errors.AddressModels?.[0]?.workingHours?.[index]?.closeTime}
            helperText={errors.AddressModels?.[0]?.workingHours?.[index]?.closeTime?.message}
           />}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid>
      {weekTitles.map((day: IHeaderWeek, index: number) => {
        setValue(`AddressModels[0].workingHours.${index}.dayOfWeek`, day.id);
        return weekSchedule(
          day.title,
          `AddressModels[0].workingHours.${index}.isOpen` as const,
          `AddressModels[0].workingHours.${index}.openTime`,
          `AddressModels[0].workingHours.${index}.closeTime`,
          index
        );
      })}
    </Grid>
  );
};
