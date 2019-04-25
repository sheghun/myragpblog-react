import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { loginUserAction } from '../../Store/Actions/Actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    errors: {
        color: 'red',
        fontSize: '16px',
        fontWeight: '700',
        marginTop: '-20px'
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                username: '',
                password: ''
            },
            passwordError: false,
            usernameError: false
        }
        this.queryString = queryString.parse(this.props.location.search)
    }

    submitHandler = (e) => {
        e.preventDefault()
        if (this.validate()) {
            console.log('validated')
            this.props.loginUserAction(this.state.inputs)
        }
    }


    validate = () => {
        const { inputs } = this.state
        for (const input in inputs) {
            const value = inputs[input]
            switch (input) {
                case 'username':
                    if (value === '') {
                        this.setState({ usernameError: true })
                        return false
                    } else {
                        this.setState({ usernameError: false })
                    }
                    break;

                case 'password':
                    if (value === '') {
                        this.setState({ passwordError: true })
                        return false
                    } else {
                        this.setState({ passwordError: false })
                    }
                    break;
                default:
                    return true
            }
        }
        return true;
    }

    changedHandler = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }

    go = () => {
        if (this.queryString.returnUrl)
            this.props.history.push(this.queryString.returnUrl)
        else
            this.props.history.push('/user/dashboard')
    }

    render() {
        const { classes } = this.props;
        const { inputs } = this.state
        const { userDetails } = this.props
        const username = userDetails.username

        const errorWarning = (error, name) => {
            if (error) {
                return <small style={{ color: 'red' }}>{`${name}`} is required</small>
            }
            return <div></div>
        }
        let errors = null;
        if (this.props.register.hasOwnProperty('errors')) {
            errors = this.props.register.errors.map(
                (error, index) => <p key={index} className={classes.errors}>{error}</p>
            )
        } else if (this.props.isLoggedIn && username) {
            errors = null;
            this.go()
        }
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.submitHandler}>
                        {errors}
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                onChange={this.changedHandler}
                                value={inputs.username}
                                autoComplete="username"
                                autoFocus
                            />
                            {errorWarning(this.state.passwordError, 'Password')}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.changedHandler}
                                value={inputs.password}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );

    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    register: state.register,
    userDetails: state.userDetails,
    isLoggedIn: state.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
    loginUserAction: (inputs) => {dispatch(loginUserAction(inputs))}
})



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));