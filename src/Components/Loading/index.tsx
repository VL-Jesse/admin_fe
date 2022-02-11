import { CircularProgress } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { selectLoading } from "../../Selector/loadingSelector";
import { useStyles } from "./style";

export const Loading = () => {
  const classes = useStyles();
  const isLoading  = useAppSelector((state: RootState) =>
  selectLoading(state)
);
  return (
    <div className={classes.Loadingcontainer}>
      {isLoading && (<CircularProgress size={400} color="secondary" thickness={2}/>)}
    </div>
  )
};
