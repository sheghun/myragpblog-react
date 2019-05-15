import React, { Component, useState, useContext, useEffect } from 'react';
import queryString from 'query-string';
// @material-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from "@material-ui/core/TextField";
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// Styles dependencies
import { StyleRulesCallback, Theme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles'
// Personal Components
import Progress from '../../Components/Progress/Progress';
// For lazy loading
import loadable from '@loadable/component';
// Context
import Context from '../../Context'
// React router dependencies
import { RouteComponentProps } from 'react-router';
// axios
import Axios, { AxiosError } from 'axios';
import SnackbarSpinner from '../../Components/SnackbarSpinner/SnackbarSpinner';
import Pricing from '../../Components/Pricing/Pricing';


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
    subMain: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
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
    const { location, history, classes } = props;
    // Loading animation
    const [loading, setLoading] = useState(false);
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
    // Current form to display
    const [currentForm, setCurrentForm] = useState('');

    const validate = () => {
        if (userName.length <= 1) {
            setError('Username is required')
            return false;
        }
        if (password.length < 6) {
            setError('Password should contain a minimum of 6 characters');
            return false;
        }
        return true;
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Loading animation
        setLoading(true)
        // Clear previous errors
        setError('');
        // Run the validation before requesting the server
        if (false === validate()) {
            return;
        }
        // Try sending request to the server
        try {
            const response = await Axios.post('/login', { userName, password });
            if (response.status === 200) {
                if (!response.data.notDone) {
                    dispatch({ type: 'LOGIN' });
                    history.push('/user/dashboard');
                }
                setCurrentForm('second');
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
        setLoading(false);
    }

    switch (currentForm) {
        case 'second':
            return <SecondForm {...props} />;

        case 'third':
            return <ThirdForm {...props} />

        default:
            return (
                <>
                    <SnackbarSpinner type="success" loading={loading} onClose={() => { }} />
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
                    </main>
                </>
            );
    }

}


const SecondForm = (props: props) => {

    // Get the props
    const { classes, history } = props;
    // Loading animation flag
    const [loading, setLoading] = useState(false);
    // List of banks
    const [banks, setBanks] = useState([{ id: 0, name: "Choose a bank", gateway: "" }])
    // List of account types to be fetched from the backend
    const [bankAccountTypes, setBankAccountTypes] = useState([{ id: 0, name: "Choose your account type" }]);
    const [ragpReferalId, setRagpReferalId] = useState('');
    const [ragpReferalIdError, setRagpReferalIdError] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [whatsappNumberError, setWhatsappNumberError] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNameError, setAccountNameError] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberError, setAccountNumberError] = useState('');
    const [bankAccountType, setBankAccountType] = useState(0);
    const [bankAccountTypeError, setBankAccountTypeError] = useState('');
    const [bank, setBank] = useState(0);
    const [bankError, setBankError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // For retrieving the bank list on page load
    useEffect(() => {
        (async () => {
            // Start the loading animation
            setLoading(true);
            try {
                const response = await Axios.get('/banks');
                setBanks(response.data);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    alert('Try again')
                }
            }
            try {
                const response = await Axios.get('/bank-account-types');
                setBankAccountTypes(response.data);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    alert('Try again')
                }
            }
            // Remove the loading animation
            setLoading(false);
        })();
    }, [])

    const validate = (): boolean => {
        let passed = true
        // Clear all errors
        setRagpReferalIdError('');
        setWhatsappNumberError('');
        setAccountNameError('');
        setAccountNumberError('');
        setBankError('');
        setBankAccountTypeError('');

        if (ragpReferalId.length <= 4) {
            setRagpReferalIdError('RAGP Referal Id is required');
            passed = false
        }
        if (whatsappNumber.length !== 11) {
            setWhatsappNumberError('Whatsapp number must be 11 digits');
            passed = false;
        }
        if (accountName.length <= 1) {
            setAccountNameError('Account name is required');
            passed = false;
        }
        if (accountNumber.length < 10) {
            setAccountNumberError('Account Number should contain a minimum of 10 digits')
            passed = false;
        }
        if (bank === 0) {
            setBankError('Bank is required');
            passed = false;
        }
        if (bankAccountType === 0) {
            setBankAccountTypeError('Bank account type is required');
            passed = false;
        }
        return passed;
    }

    const submit = async () => {
        // Has already been submitted before
        setSubmitted(true);
        if (false === validate()) {
            return;
        }
        // Validation was passed
        // Start loading animation
        setLoading(true);
        // Post data to the server
        try {
            // Construct the data
            const data = { ragpReferalId, whatsappNumber, accountName, accountNumber, bankAccountType, bank };
            const response = await Axios.put('/member', data);
            if (response.status === 200) {
                history.push('/package');
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                if (err.response.status === 403) {
                    history.push('/login');
                }
            }
        }
        // Stop loading animation
        setLoading(false);
    }

    return (
        <>
            <SnackbarSpinner type="success" loading={loading} onClose={() => { }} />
            <main className={classes.subMain}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        Continue Your Registration
                    </Typography>
                    <Typography>
                        Feel the form below to continue your registration
                    </Typography>
                    <br />
                    <Grid container spacing={24}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardName"
                                label="Recharge And Get Paid Referal Id"
                                name="ragpReferalId"
                                onBlur={() => { if (submitted) validate() }}
                                fullWidth
                                error={!!ragpReferalIdError}
                                helperText={ragpReferalIdError}
                                onChange={(event) => setRagpReferalId(event.currentTarget.value)}
                                value={ragpReferalId}
                            />

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Whatsapp number"
                                name="whatsappNumber"
                                onBlur={() => { if (submitted) validate() }}
                                fullWidth
                                error={!!whatsappNumberError}
                                helperText={whatsappNumberError}
                                onChange={(event) => setWhatsappNumber(event.currentTarget.value)}
                                value={whatsappNumber}

                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required id="expDate"
                                label="Account name"
                                name="accountName"
                                onBlur={() => { if (submitted) validate() }}
                                fullWidth
                                error={!!accountNameError}
                                helperText={accountNameError}
                                value={accountName}
                                onChange={(event) => setAccountName(event.currentTarget.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                label="Account number"
                                name="accountNumber"
                                onBlur={() => { if (submitted) validate() }}
                                fullWidth
                                error={!!accountNumberError}
                                helperText={accountNumberError}
                                value={accountNumber}
                                onChange={(event) => setAccountNumber(event.currentTarget.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!bankAccountTypeError}>
                                <InputLabel htmlFor="bankAccountType">Account Type</InputLabel>
                                <Select
                                    native
                                    value={bankAccountType}
                                    onChange={(event) => setBankAccountType(parseInt(event.currentTarget.value))}
                                    inputProps={{
                                        name: 'bankAccountType',
                                        id: 'bankAccountType',
                                    }}
                                    onBlur={() => { if (submitted) validate() }}
                                >
                                    <option value={0}>Choose Your Account Type</option>
                                    {bankAccountTypes.map((accountType, index) => (
                                        <option value={accountType.id} key={index}>
                                            {accountType.name.charAt(0).toUpperCase() + accountType.name.slice(1)}
                                        </option>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {bankAccountTypeError}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!bankError}>
                                <InputLabel htmlFor="bank">Bank</InputLabel>
                                <Select
                                    native
                                    onChange={(event) => setBank(parseInt(event.currentTarget.value))}
                                    value={bank}
                                    onBlur={() => { if (submitted) validate() }}
                                    inputProps={{
                                        name: 'bank',
                                        id: 'bank',
                                    }}
                                >
                                    <option value={0}>Choose your bank</option>
                                    {banks.map((bank, index) => (
                                        <option value={bank.id} key={index}>{bank.name}</option>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {bankError}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submit}
                            style={{ marginTop: '32px', marginLeft: '32px' }}
                        >
                            Next
                    </Button>
                    </div>
                </Paper>
            </main>
        </>
    );

}

const ThirdForm = (props: props) => {

    return (
        <Pricing />
    )
}

export default withStyles(useStyles as any)(SignIn);