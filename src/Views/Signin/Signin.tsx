import React, { Component, useState, useContext } from 'react';
import queryString from 'query-string';
// @material-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from "@material-ui/core/TextField";
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Styles dependencies
import { StyleRulesCallback, Theme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles'
// Context
import Context from '../../Context'
// React router dependencies
import { RouteComponentProps } from 'react-router';
// axios
import Axios, { AxiosError } from 'axios';

const useStyles = ((theme: Theme) => ({
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
        fontWeight: 700,
        marginTop: '-20px'
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit * 2,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
}));

interface props extends RouteComponentProps {
    classes: any;
}

const SignIn = (props: props) => {

    // Extract properties from props
    const { location, classes } = props;
    // Get the context from the global state
    const dispatch = useContext(Context).dispatch;
    // username state
    const [userName, setUserName] = useState('');
    // password state
    const [password, setPassword] = useState('');
    // Error state
    const [error, setError] = useState('');
    // Error username state
    const queryUrl = queryString.parse(location.search)


    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Clear previous errors
        setError('');
        // Try sending request to the server
        try {
            const response = await Axios.post('/login', { userName, password });
            if (response.status === 200) {
                dispatch({ type: 'LOGIN' });
            }
        } catch (error) {
            //Type alias
            const err = error as AxiosError;
            // @ts-ignore
            if (err.response.status === 422) {
                setError('Inputs incorrect')
            }
            // @ts-ignore
            if (err.response.status === 401) {
                setError('Username Or Password Incorrect')
            }
        }

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
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
                <form className={classes.form} onSubmit={submit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        id="username"
                        name="username"
                        type="text"
                        onChange={(event) => setUserName(event.target.value)}
                        value={userName}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
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
        </main >
    );
}

export default withStyles(useStyles as any)(SignIn);