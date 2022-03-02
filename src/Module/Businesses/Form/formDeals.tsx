import {
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { IFormParams, IHeaderDeal } from "../../../interface/businessTypes";
import { Controller } from "react-hook-form";
import { dealsTitle } from "../../../utils/deals";

export const FormDeals = ({ register, errors, control, setValue }: IFormParams) => {
  const classes = useStyles();
  
  const dealForm = (id: number, title: string) => {
    return (
      <Grid key={`grid-${title}`}>
         <Typography variant="h6" className={classes.subtitle}>
        {title}:
      </Typography>
      <Grid className={classes.form}>
        <Typography variant="subtitle1"> Name: </Typography>
        <TextField
          fullWidth
          variant={"outlined"}
          error={!!errors.dealModels?.[id]?.title}
          {...register(`dealModels.${id}.title`)}
          helperText={errors.dealModels?.[id]?.title?.message}
        />
        <Typography variant="subtitle1"> Price: </Typography>
        <TextField
          fullWidth
          variant={"outlined"}
          type={"number"}
          onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
          error={!!errors.dealModels?.[id]?.maxMoneyAmount}
          {...register(`dealModels.${id}.maxMoneyAmount`)}
          helperText={errors.dealModels?.[id]?.maxMoneyAmount?.message}
        />
        <Typography variant="subtitle1"> Description: </Typography>
        <TextField
          fullWidth
          variant={"outlined"}
          error={!!errors.dealModels?.[id]?.shortDescription}
          {...register(`dealModels.${id}.shortDescription`)}
          helperText={errors.dealModels?.[id]?.shortDescription?.message}
        />
        <Typography variant="subtitle1"> Disclaimer: </Typography>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          minRows={4}
          variant={"outlined"}
          error={!!errors.dealModels?.[id]?.disclaimer}
          {...register(`dealModels.${id}.disclaimer`)}
          helperText={errors.dealModels?.[id]?.disclaimer?.message}
        />
        <Typography variant="subtitle1"> Unlimited redemptions: </Typography>
        <Controller
        name={`dealModels.${id}.isUnlimited` as any}
        control={control}
        defaultValue={false}
        rules={{ required: false }}
        render={({ field }) => <Checkbox {...field} checked={field.value}/>}
      />
      </Grid>
        </Grid>
    )
  }


  return (
    <Grid>
    {dealsTitle.map((deal: IHeaderDeal, index: number)=> {
      setValue(`dealModels.[${index}].orderIndex`, index);
      return dealForm(index, deal.title)
    })}
    </Grid>
  );
};
