import { useState } from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import { useStyles } from "./styles";
import { BiMenu, BiLogOut, BiChevronLeft } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../Routes/path";
import LogoText from "../../Image/Date-Night-White-Logo-No-Crescent Moon.png";
import Logo from "../../Image/Date-Night-White-Logo.png";
import { Avatar, Grid } from "@material-ui/core";
import { defaultColor } from "../../Styles/defaultStyles";
import { useAuthHook } from "../../Hook/useAuthHook";
interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const Sidebar = ({ children }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate()
  const authHook = useAuthHook()
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawer = (value: boolean) => {
    setOpen(value);
  };

  const logoutHandler = () => {
    authHook.removeUser()
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => handleDrawer(!open)}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <BiMenu />
          </IconButton>
          <Grid>
            <img
              onClick={() => navigate(path.HOME)}
              src={LogoText}
              title="DateNight"
              className={classes.logoText}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={classNames(classes.backgroundDrawer, classes.drawerHeader)}
          onClick={() => handleDrawer(false)}
        >
          <Grid className={classes.drawerTitle}>
          <IconButton aria-label="close drawer" >
           <BiChevronLeft color={defaultColor.white} size={40}/>
          </IconButton>
            <Avatar
              variant={"rounded"}
              alt="DateNight"
              src={Logo}
            />
          </Grid>
        </div>
        <List className={classes.list}>
          <Link to={path.USER} className={classes.linkText}>
            <ListItem button>
              <Typography variant="h6" color="textSecondary">
                Users
              </Typography>
            </ListItem>
          </Link>
          <Link to={path.BUSINESSES} className={classes.linkText}>
            <ListItem button>
              <Typography variant="h6" color="textSecondary">
                Businesses
              </Typography>
            </ListItem>
          </Link>
          <Link to={path.ONLINEDEALS} className={classes.linkText}>
            <ListItem button>
              <Typography variant="h6" color="textSecondary">
                Online Deals
              </Typography>
            </ListItem>
          </Link>
          <Link
            to={path.LOGOUT}
            className={classNames(classes.linkText, classes.logout)}
            onClick={() => logoutHandler()}
          >
            <ListItem button className={classes.buttonContainer}>
                <BiLogOut color={defaultColor.darkGray} size={20}/>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.textMargin}
                >
                  Logout
                </Typography>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};
