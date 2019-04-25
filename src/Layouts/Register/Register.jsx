import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

// Personal components
import ErrorWrapper from '../../Hoc/ErrorWrapper/ErrorWrapper'

// Lazy loaded Components
const FirstForm = React.lazy(() => import('../../Views/Register/FirstForm'))
const SecondForm = React.lazy(() => import('../../Views/Register/SecondForm'));
const ThirdForm = React.lazy(() => import('../../Views/Register/ThirdForm'));
const VerifyPayment = React.lazy(() => import('../../Views/Register/VerifyPayment'))

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
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
        activeStep: 0,
        submit: 0
    };

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
                return <FirstForm {...restProps} />;
            case 2:
                return <SecondForm {...restProps} />;
            case 3:
                return <ThirdForm {...restProps} />;
            default:
                throw new Error('Unknown step');
        }
    }

    render() {
        const { classes } = this.props;
        const { submit } = this.state;
        const activeStep = this.props.match.params.step
        console.log(activeStep)

        return (
            <ErrorWrapper>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="absolute" color="primary" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                My Ragp's Blog
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h4" align="center">
                                {activeStep === 'verifyPayment' ? 'Verify Payment' : 'Register' || activeStep === '3' ? 'Payment' : 'Register'}
                            </Typography>
                            <Stepper activeStep={
                                activeStep === 'verifyPayment' ? 3 : +activeStep - 1
                            } className={classes.stepper}>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <React.Fragment>
                                <React.Fragment>
                                    {this.getStepContent(activeStep, submit)}
                                </React.Fragment>
                            </React.Fragment>
                        </Paper>
                    </main>
                </React.Fragment>
            </ErrorWrapper>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);