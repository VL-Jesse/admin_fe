import { Grid } from "@material-ui/core"
import { Sidebar } from "../../Components/Sidebar"
import Logo from "../../Image/Date-Night-Blue-Logo.svg";
import { useStyles } from "./styles";

export const Home = () => {
    const classes = useStyles();
    return (
        <Sidebar>
            <Grid className={classes.container}>
            <img src={Logo} title="DateNight" width="500" height="250" />
          </Grid>
        </Sidebar>
    )

}