/* eslint-disable */

// cSpell: ignore scrollbar segun's accbtn mobilebutton

import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
// @material-ui/core Components
import withStyles from "@material-ui/core/styles/withStyles";
// core Components
import Header from "../../Components/HeaderDashboard/HeaderDashboard";
import Footer from "../../Components/Footer/Footer.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar";

// Hoc's
import ErrorWrapper from '../../Hoc/ErrorWrapper/ErrorWrapper';

import dashboardRoutes from "../../Routes/Dashboard";

import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "../../assets/img/sidebar-2.jpg";
import logo from "../../assets/img/reactlogo.png";
import Context from "../../Context";

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
    </Switch>
);

class Dashboard extends React.Component {

    // Get the context
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    getRoute() {
        return this.props.location.pathname !== "/maps";
    }
    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }
    componentDidMount() {
        window.addEventListener("resize", this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }
    render() {
        const { classes, location, match, ...rest } = this.props
        // Get the context from the state
        const context = this.context.state;
        console.log(location)


        return (
            <>
                {!context.loggedIn ?
                    <Redirect to={'/login?returnUrl=' + location.pathname} />
                    :
                    <div className={classes.wrapper}>
                        <Sidebar
                            routes={dashboardRoutes}
                            logoText={"My Ragp's Blog"}
                            logo={logo}
                            image={image}
                            handleDrawerToggle={this.handleDrawerToggle}
                            open={this.state.mobileOpen}
                            color="purple"
                            location={location}
                            {...rest}
                        />
                        <div className={classes.mainPanel} ref="mainPanel">
                            <Header
                                routes={dashboardRoutes}
                                color="primary"
                                handleDrawerToggle={this.handleDrawerToggle}
                                {...rest}
                            />
                            {this.getRoute() ? (
                                <div className={classes.content}>
                                    <div className={classes.container}>
                                        {dashboardRoutes.map((prop, key) => {
                                            return <Route exact path={prop.path} component={prop.component} key={key} />;
                                        })}
                                    </div>
                                </div>
                            ) : (
                                    <div className={classes.map}>{switchRoutes}</div>
                                )}
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default withRouter(withStyles(dashboardStyle)(Dashboard))
