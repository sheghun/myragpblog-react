import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'

import classes from './Header.module.css';

// Material ui components
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

import Avatar from '../Avatar/Avatar'

let oldPageYOffset;

const styles = theme => ({
    rootAppBar: {
        flexGrow: 1,
        display: 'none',
        transition: 'all 3s linear'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBarTransparent: {
        backgroundColor: 'transparent'
    },
    appBar: {
        display: 'flex',
    }
});


class Header extends Component {

    state = {
        headerClasses: [classes.header],
        showMobile: false,
        appBarClass: 'appBarTransparent',

        appBar: {
            displayPrimary: false,
            displaySecondary: false,
            variant: 'primary',
            offset: undefined
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEffect)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollEffect)
    }

    scrollEffect = async (e) => {
        // Get the window height offset
        const pageY = window.pageYOffset;

        if (pageY > 240) {
            await this.setState(prevState => ({
                // headerClasses: [classes.header, classes.headerbackground],
                appBarClass: 'appBar',
                appBar: {
                    ...prevState.appBar,
                    displayPrimary: true
                }
            }))
            // Check if the app bar page offset has not been set it now
            if (this.state.appBar.offset === undefined) {
                await this.setState(prevState => ({ appBar: { ...prevState.appBar, offset: pageY } }))
            } else if (this.state.appBar.offset > pageY + 10) {
                // Show the secondary app bar when scrolling down
                await this.setState(prevState => ({
                    appBar: { ...prevState.appBar, displayPrimary:false, displaySecondary: true, offset: pageY }
                }))
            } else if (this.state.appBar.offset < pageY + 10) {
                // Show the primary app bar when scrolling up
                await this.setState(prevState => ({
                    appBar: { ...prevState.appBar, displaySecondary: false, displayPrimary: true, offset: pageY }
                }))
            }

        } else if (pageY < 240) {
            await this.setState(prevState => ({
                // headerClasses: [classes.header],
                appBarClass: 'appBarTransparent',
                appBar: {
                    ...prevState.appBar,
                    displayPrimary: false,
                    displaySecondary: false
                }
            }))
        }

    }

    toggleMobileHandler = () => {
        this.setState(prevState => {
            return {
                showMobile: !prevState.showMobile
            }
        });
    }

    closeMobileMenu = () => {
        setTimeout(() => {
            this.setState({ showMobile: false });
        }, 2000);
    }

    render() {
        const { headerClasses } = this.state;
        const { userDetails, isLoggedIn } = this.props
        const inClasses = this.props.classes
        const username = localStorage.getItem('username')

        const smallMenuClasses = [classes.mobileMenu]

        if (this.state.showMobile) {
            smallMenuClasses.push(classes.mobileOpen)
        }
        const packageNo = parseInt(userDetails.package);
        return (

            <>
                {/* MOBILE MENU  */}
                <div className={smallMenuClasses.join(' ')}>
                    <span
                        className={classes.mobileCloseButton}
                        onClick={this.toggleMobileHandler}
                    >
                        &times;
                    </span>
                    <div className={classes.mobileContent}>
                        <NavLink
                            onClick={this.closeMobileMenu}
                            className={classes.mobileMenuLinks}
                            to={`/${username}`}>
                            Home
                        </NavLink>
                        <NavLink
                            onClick={this.closeMobileMenu}
                            className={classes.mobileMenuLinks}
                            to={{
                                pathname: `/register/1`,
                                search: `?referer=${username}`
                            }}
                        >
                            Register
                        </NavLink>
                        <NavLink
                            onClick={this.closeMobileMenu}
                            className={classes.mobileMenuLinks}
                            to={`/home/login`}
                        >
                            Login
                        </NavLink>

                    </div>
                    <div>
                        <p className={[classes.mobileMenuLinks, classes.mobilenumber].join(' ')}>
                            +2348143112637
                        <img className={classes.mobilewhatsapp}
                                alt=""
                                src="data:image/png;base64,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"
                            />
                        </p>

                    </div>
                </div>
                {/* END MOBILE MENU */}

                {/* BIG SCREEN MENU */}
                <div
                    className={headerClasses.join(' ')}
                >
                    <button className={classes.mobilebutton} onClick={this.toggleMobileHandler}>&#9776;</button>
                    <h1 className={classes.logo}>segun's blog</h1>
                    {isLoggedIn ?
                        <div className={classes.account}>
                            {packageNo < 3 ?
                                <button className={classes.accbtn}>Upgrade</button>
                                :
                                null
                            }
                            <Avatar src={userDetails.image} />
                        </div>
                        :
                        <div className={classes.account}>
                            <NavLink to='/base/login' className={classes.accbtn}>Login</NavLink>
                        </div>
                    }
                </div>

                <div className={inClasses.root}>
                    {/* PRIMARY APP BAR */}
                    <Slide
                        timeout={{enter: 1000, exit: 100}}
                        direction="down" in={this.state.appBar.displayPrimary}
                        mountOnEnter unmountOnExit
                >
                        <AppBar position="fixed" classes={{
                            root: inClasses.appBar
                        }} color={'primary'}>
                            <Toolbar>
                                <IconButton
                                    className={classes.menuButton}
                                    onClick={this.toggleMobileHandler}
                                    color="inherit" aria-label="Menu"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.grow}>
                                    News
                            </Typography>
                                <Button color="inherit">Login</Button>
                            </Toolbar>
                        </AppBar>
                    </Slide>
                    {/* END PRIMARY APP BAR */}

                    {/* SECONDARY APP BAR */}
                    <Slide
                        timeout={{enter: 1000, exit: 500}}
                        direction="down" in={this.state.appBar.displaySecondary}
                        mountOnEnter unmountOnExit

                    >
                        <AppBar position="fixed" classes={{
                            root: inClasses.appBar
                        }} color={'secondary'}>
                            <Toolbar>
                                <IconButton
                                    className={classes.menuButton}
                                    onClick={this.toggleMobileHandler}
                                    color="inherit" aria-label="Menu"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.grow}>
                                    News
                            </Typography>
                                <Button color="inherit">Login</Button>
                            </Toolbar>
                        </AppBar>
                    </Slide>
                    {/* SECONDARY APP BAR */}
                </div>

                {/* END BIG SCREEN MENU */}
            </>
        );
    }
}




const mapStateToProps = (state) => ({
    memberDetails: state.memberDetails,
    userDetails: state.userDetails,
    isLoggedIn: state.isLoggedIn
})
export default connect(mapStateToProps)(withStyles(styles)(Header))

