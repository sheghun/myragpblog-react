import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Lazy loaded Components
const FirstForm = React.lazy(() => import('../../Views/Register/FirstForm'))
const SecondForm = React.lazy(() => import('../../Views/Register/SecondForm'));
const ThirdForm = React.lazy(() => import('../../Views/Register/ThirdForm'));
const VerifyPayment = React.lazy(() => import('../../Views/Register/VerifyPayment'))

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    toolbarSpacing: theme.mixins.toolbar,
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
});

const steps = ['', '', ''];


class Register extends React.Component {
    state = {
        activeStep: 1,
        submit: 0
    };

    goToStep = (i) => {
        this.setState(state => ({...state, activeStep: i}));
	}
	

    /**
     * Get the current step and choose the form to display
     */
    getStepContent(step, submit) {
        const { classes, ...restProps } = this.props
        const stepInt = +step
        if(step === 'verifyPayment') {
            return <VerifyPayment {...restProps} />
        }
        switch (stepInt) {
            case 1:
                return <FirstForm next={this.goToStep} {...restProps} />;
            case 2:
                return <SecondForm next={this.goToStep} {...restProps} />;
            case 3:
                return <ThirdForm next={this.goToStep} {...restProps} />;
            default:
                throw new Error('Unknown step');
        }
    }

    render() {
        const { classes } = this.props;
        const { submit } = this.state;
        const activeStep = this.state.activeStep

        return (
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="absolute" color="primary" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                My Ragp's Blog
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.toolbarSpacing} />
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4" align="center">
                                Register
                            </Typography>
                            <React.Fragment>
                                <React.Fragment>
                                    {this.getStepContent(activeStep, submit)}
                                </React.Fragment>
                            </React.Fragment>
                        </Paper>
                    </main>
                </React.Fragment>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);