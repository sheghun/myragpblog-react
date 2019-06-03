import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// @ts-ignore
import classNames from "classnames";
import React from "react";
// core components
import HeaderLinks from "./HeaderLinks.jsx";

import Button from "../CustomButtons/Button"

import { withRouter } from "react-router-dom";
import headerStyle from "../../assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }: any) {
  function makeBrand() {
    let name;
      props.routes.map((prop: any, key: any) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar color="secondary" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden mdUp={true} implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
// @ts-ignore
export default withRouter(withStyles(headerStyle)(Header));
