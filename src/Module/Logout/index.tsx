import { Button, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import Logo from "../../Image/Date-Night-Blue-Logo.svg";
import { Link } from "react-router-dom";
import { path } from "../../Routes/path";
import { BiLogIn } from "react-icons/bi";

export const Logout = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.background}>
      <Grid container className={classes.container}>
        <Paper variant="elevation" elevation={3} className={classes.paper}>
          <Grid className={classes.header}>
            <img src={Logo} title="DateNight" width="400" height="200" />
          </Grid>
          <Grid>
            <Typography variant="h5" color="textSecondary">
              Logout Successful
            </Typography>
            <Link to={path.LOGIN}>
            <Button color="secondary" variant="text" startIcon={<BiLogIn />} className={classes.linkText}> 
            Go to login
          </Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
