import {StyleRulesCallback, Theme} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/styles';
import Axios, {AxiosError} from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import SnackbarSpinner from '../../Components/SnackbarSpinner/SnackbarSpinner';
import {IApiError} from '../../types';
import queryString from 'query-string';

const useStyles = makeStyles<StyleRulesCallback>(theme => ({
    paper: {
        background: `
		linear-gradient(
			to bottom right, #fff 49%, #f5f5f5 30%, #f5f5f5 89%
			)
		`,
        borderRadius: '10px',
        padding: theme.spacing.unit * 4,
        width: '95vw',
    },
    wrapper: {
        alignItems: 'center',
        background: `
		linear-gradient(
			to bottom right, #fff 49%, #f5f5f5 30%, #f5f5f5 89%, #fff 60%
			)
		`,
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
    },
    [theme.breakpoints.up('sm')]: {
        paper: {
            background: 'white',
        },
    },
    [theme.breakpoints.up('md')]: {
        paper: {
            width: '720px',
        },
    },
}));

const Register = ({location}: RouteComponentProps) => {
    const classes = useStyles();
    const theme = useTheme() as Theme;

    const xsmall = useMediaQuery(theme.breakpoints.down('xs'));
    const emailTestString = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Inputs
    const [referalId, setReferalId] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tAndC, setTAndC] = useState(false);
    const [errors, setErrors] = useState({
        confirmPassword,
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        referalId,
        tAndC: '',
        username,
    });

    useEffect(() => {
        const {referalId} = queryString.parse(location.search);
        if (referalId && referalId !== '') {
            setReferalId(referalId as string);
        }
    }, []);

    const changeInputs = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        if (
            name === 'username' ||
            name === 'lastName' ||
            name === 'firstName' ||
            name === 'referalId'
        ) {
            // if the input contains any non-alphanumeric value silently return;
            if (/\W/.test(value)) {
                return;
            }
        }

        // If input contains alphabet for phone number is sending an alphabet exit;
        if (name === 'phoneNumber' && /\D/.test(value)) {
            return;
        }

        switch (name) {
            case 'referalId':
                setReferalId(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
        }
    };

    const validate = (): boolean => {
        let pass = true;
        const err = {
            confirmPassword: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            phoneNumber: '',
            referalId: '',
            tAndC: '',
            username: '',
        };

        if (referalId.length < 1) {
            pass = false;
            err.referalId = "Can't be empty";
        }
        if (username.length < 1) {
            pass = false;
            err.username = "Can't be empty";
        }
        if (firstName.length < 1) {
            pass = false;
            err.firstName = "Can't be empty";
        }
        if (lastName.length < 1) {
            pass = false;
            err.lastName = "Can't be empty";
        }
        if (email.length < 1) {
            pass = false;
            err.email = "Can't be empty";
        }
        if (!emailTestString.test(email)) {
            pass = false;
            err.email = 'E-mail is invalid';
        }
        if (phoneNumber.length !== 11) {
            pass = false;
            err.phoneNumber = 'Phone must be 11 digits';
        }
        if (password.length < 6) {
            pass = false;
            err.password = 'Must be a minimum of 6 digits';
        }
        if (confirmPassword !== password) {
            pass = false;
            err.confirmPassword = 'Passwords does not match';
        }
        if (tAndC === false) {
            pass = false;
            err.tAndC = 'You must agree to our terms and condition';
        }

        setErrors(err);
        return pass;
    };

    const submit = async () => {
        // Check if the validation is passed
        if (!validate()) {
            return;
        }
        setLoading(true);
        const data = {
            email,
            firstName,
            lastName,
            password,
            phoneNumber,
            referalId,
            tAndC,
            username,
        };

        try {
            const res = await Axios.post('/user', data);
            if (res.status === 201) {
                setSuccess(true);
            }
        } catch (error) {
            const err = error as AxiosError;
            const er = {
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                phoneNumber: '',
                referalId: '',
                tAndC: '',
                username: '',
            };
            if (err.response) {
                if (err.response.status === 422) {
                    const d = err.response.data.errors as IApiError[];
                    d.map(e => {
                        // @ts-ignore
                        er[e.param] = e.msg;
                    });
                    setErrors(er);
                }
            }
        }
        setLoading(false);
    };

    return (
        <div className={classes.wrapper}>
            <SnackbarSpinner loading={loading} />
            {success ? (
                <Successful />
            ) : (
                <Grid container={true} className={classes.grid} justify="center">
                    <Grid item={true} className={classes.gridItem}>
                        <Paper elevation={xsmall ? 0 : 2} className={classes.paper}>
                            <Typography variant="h3" align="center">
                                Register
                            </Typography>
                            <Typography align="center" variant="subtitle1">
                                Fill in the form to begin
                            </Typography>
                            <Grid
                                container={true}
                                spacing={8}
                                style={{
                                    marginTop: '2rem',
                                }}
                                justify="space-evenly"
                            >
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="Referal ID"
                                        value={referalId}
                                        error={!!errors.referalId}
                                        helperText={errors.referalId}
                                        onChange={changeInputs('referalId')}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="Username"
                                        value={username}
                                        error={!!errors.username}
                                        helperText={errors.username}
                                        onChange={changeInputs('username')}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="First name"
                                        value={firstName}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        onChange={changeInputs('firstName')}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="Last name"
                                        value={lastName}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        onChange={changeInputs('lastName')}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="E-mail"
                                        value={email}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        onChange={changeInputs('email')}
                                        inputProps={{
                                            type: 'email',
                                        }}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="Phone number"
                                        value={phoneNumber}
                                        error={!!errors.phoneNumber}
                                        helperText={errors.phoneNumber}
                                        onChange={changeInputs('phoneNumber')}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="Password"
                                        value={password}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        onChange={changeInputs('password')}
                                        inputProps={{
                                            type: 'password',
                                        }}
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={5} md={5}>
                                    <TextField
                                        style={{width: '100%'}}
                                        label="Confirm password"
                                        value={confirmPassword}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword}
                                        onChange={changeInputs('confirmPassword')}
                                        inputProps={{
                                            type: 'password',
                                        }}
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={tAndC}
                                                value="antoine"
                                                color="primary"
                                                onChange={() => setTAndC(!tAndC)}
                                            />
                                        }
                                        label="I hereby agree to the terms and condition."
                                    />
                                    <Typography color="error">{errors.tAndC}</Typography>
                                </Grid>
                                <Grid sm={12} item={true} justify="center">
                                    <Button variant="contained" color="primary" onClick={submit}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

const Successful = () => {
    const classes = useStyles();
    const theme = useTheme() as Theme;

    const xsmall = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <>
            <Grid container={true} spacing={8} justify="center">
                <Grid item={true} xs={12} sm={8} md={6}>
                    <Paper elevation={xsmall ? 0 : 2} className={classes.paper}>
                        <Typography variant="h4" align="center">
                            Registration Successful
                        </Typography>
                        <Typography align="center">
                            You can now <Link to="/login">Login</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Register;
