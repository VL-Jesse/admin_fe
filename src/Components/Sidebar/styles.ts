import { makeStyles } from "@material-ui/core";
import { defaultColor } from '../../Styles/defaultStyles'

export const useStyles = makeStyles(theme => ({
root: {
    display: 'flex',
  },
  appBar: {
    height:64,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: '5%',
    marginLeft: '12%',
    marginRight: '0%'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  backgroundDrawer: {
    backgroundColor: defaultColor.darkBlue,
  },
  linkText: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    left: 0,
    position: "fixed",
    width: 240,
    bottom: 0,
    alignItems: 'center',
    paddingBottom: 10,
  },
  logoText: {
    marginTop: 0,
    width: 200,
    height: 200
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer:{
    justifyContent: 'space-content'
  },
  textMargin: {
    marginLeft: 5,
  },
  drawerTitle: {
    display: 'flex',
    flexDirection: 'row',
    placeItems: "center",
  },
  hidden: {
    overflow: "hidden"
  }
}));
