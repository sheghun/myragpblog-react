/* eslint-disable */

// cSpell: ignore scrollbar segun's accbtn mobilebutton

import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
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
        const { classes, match, isLoggedIn, ...rest } = this.props
        if (!isLoggedIn) return <Redirect to={`/login?returnUrl=${location.pathname}`} />
        return (
            <ErrorWrapper>
                <div className={classes.wrapper}>
                    <Sidebar
                        routes={dashboardRoutes}
                        logoText={"My Ragp's Blog"}
                        logo={logo}
                        image={image}
                        handleDrawerToggle={this.handleDrawerToggle}
                        open={this.state.mobileOpen}
                        color="red"
                        {...rest}
                    />
                    <div className={classes.mainPanel} ref="mainPanel">
                        <Header
                            routes={dashboardRoutes}
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
                        {this.getRoute() ? <Footer /> : null}
                    </div>
                </div>
            </ErrorWrapper>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard))
