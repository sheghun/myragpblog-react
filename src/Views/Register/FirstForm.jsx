import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SnackbarSpinner from '../../Components/SnackbarSpinner/SnackbarSpinner'
import Snackbar from '../../Components/Snackbar/Snackbar'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup'

import Axios from 'axios'
import queryString from 'query-string'

const styles = theme => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
    label: {
        color: 'red'
    }
})

class FirstForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                email: '',
                lastName: '',
                password: '',
                userName: '',
                firstName: '',
                referalId: '',
                phoneNumber: '',
                confirmPassword: '',
                termsAndCondition: false,
            },

            registerErrors: [],
            registerSuccess: [],

            loading: false,
            submitted: false,
            emailError: false,
            userNameError: false,
            passwordError: false,
            lastNameError: false,
            referalIdError: false,
            firstNameError: false,
            phoneNumberError: false,
            confirmPassword: false,
            termsAndConditionError: false,
        }
    }

    queryString = queryString.parse(this.props.location.search)

    componentDidMount() {
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                referalId: this.queryString.referer || ''
            }
        }))
    }

    changeHandler = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value)
        const name = target.name;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }

            }
        })
    }

    /**
     * Validate the user's inputs before
     * Required: email, lastName, firstName, password, confirmPassword, username, referalId, ragpReferalId, termsAndCondition
     */
    validate = (inputs, callback) => {
        function validateEmail(email) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        }
        // For storing the errors
        const error = []
        // Validate inputs
        for (const value in inputs) {
            switch (value) {
                // Validate Referal Id
                case 'referalId':
                    if (inputs[value].length > 0 && typeof (inputs[value]) === 'string') {
                        this.setState({ referalIdError: false })
                    } else {
                        this.setState({ referalIdError: 'Referal Id is required' })
                        error.push('referalId')
                    }
                    break;

                // Validate Firstname
                case 'firstName':
                    if (inputs[value].length > 0 && typeof (inputs[value]) === 'string') {
                        this.setState({ firstNameError: false })
                    } else {
                        this.setState({ firstNameError: true })
                        error.push('firstName')
                    }
                    break;

                // Validate Lastname
                case 'lastName':
                    if (inputs[value].length > 0 && typeof (inputs[value]) === 'string') {
                        this.setState({ lastNameError: false })
                    } else {
                        this.setState({ lastNameError: true })
                        error.push('lastName')
                    }
                    break;

                // Validate Email
                case 'email':
                    if (inputs[value].length > 0 && validateEmail(inputs[value].trim())) {
                        this.setState({ emailError: false })
                    } else {
                        this.setState({ emailError: 'Email is required and must be a valid email' })
                        error.push('email')
                    }
                    break;

                // Validate Username
                case 'userName':
                    if (inputs[value].length > 0 && typeof (inputs[value]) === 'string') {
                        this.setState({ userNameError: false })
                    } else {
                        this.setState({ userNameError: 'Username is required' })
                        error.push('userName')
                    }
                    break;

                // Validate Password
                case 'password':
                    if (inputs[value].length > 6 && typeof (inputs[value]) === 'string') {
                        this.setState({ passwordError: false })
                    } else {
                        this.setState({ passwordError: true })
                        error.push('password')
                    }
                    break;

                // Validate Password Again
                case 'confirmPassword':
                    if (inputs[value] === inputs['password']) {
                        this.setState({ confirmPassword: false })
                    } else {
                        this.setState({ confirmPassword: true })
                        error.push('confirmPassword')
                    }
                    break;

                // Validate Recharge And Get Paid Referal Id
                case 'phoneNumber':
                    if (inputs[value].length === 11) {
                        this.setState({ phoneNumberError: false })
                    } else {
                        this.setState({ phoneNumberError: 'Phone number should be 11 digits' })
                        error.push('ragpReferalId')
                    }
                    break;

                // Validate terms and condition
                case 'termsAndCondition':
                    if (inputs[value]) {
                        this.setState({ termsAndConditionError: false })
                    } else {
                        this.setState({ termsAndConditionError: true })
                        error.push('termsAndCondition')
                    }
                    break;

                default:
                    break;
            }
        }
        if (error.length === 0) {
            callback(false)
        }
        else {
            callback(true)
        }
    }

    submit = () => {
        // Validate inputs first
        this.validate(this.state.inputs, async (err) => {
            if (err) return;
            // Set the loading to show
            this.setState(state => ({ ...state, loading: true }));
            // Try connecting to the server
            try {
                // Check if the number already exists
                const response = await Axios.post('/member/verify?type=number', { input: this.state.inputs.phoneNumber });
                if (response.status === 200) {
                    this.setState({ phoneNumberError: 'Phone number has already exists', loading: false });
                    return;
                }
            } catch (err) {
                if (err.response) {
                    // Phone number does not exists
                    if (err.response.status === 404) {
                        // Then validate the username
                        try {
                            // Check if username has already been used
                            const response = await Axios.post('/member/verify?type=username', { input: this.state.inputs.userName });
                            if (response.status === 200) {
                                this.setState({ userNameError: 'Username already exists', loading: false });
                                return
                            }
                        } catch (err) {
                            // Then username does not exist
                            if (err.response.status === 404) {
                                // Check if referalId exists
                                // We are verifying through username coz the referalId is still a username
                                try {
                                    const response = await Axios.post('/member/verify?type=username', { input: this.state.inputs.referalId });
                                    // If referal Id exists
                                    if (response.status === 200) {
                                        // check if the email has already been used
                                        try {
                                            const response = await Axios.post('/member/verify?type=email', { input: this.state.inputs.email })
                                            if (response.status === 200) {
                                                // Means email exists
                                                this.setState({ emailError: 'E-mail already exists' });
                                                return;
                                            }
                                        } catch (err) {
                                            // Email does not exists
                                            if (err.response.status === 404) {
                                                // Post all inputs to the api
                                                try {
                                                    const response = await Axios.post('/member', {...this.state.inputs});
                                                    if (response.status === 201) {
                                                        
                                                    }
                                                } catch (error) {
                                                    if(error.response) {
                                                        alert('not working');
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } catch (err) {
                                    // Referal Id does not exists
                                    if (err.response.status === 404) {
                                        this.setState({ referalIdError: 'Referal Id does not exist', loading: false });
                                        return
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    /**
     * For removing unique errors using their index from the "this.state.registerErrors"
     *
     */
    clearRegisterErrors = (event, reason, index, type) => {
        // Check if the action was clicked or it was clickaway
        if (reason === 'clickaway') {
            return
        } else {
            if (type === 'error') {
                this.setState(prevState => {
                    const newRegisterErrors = prevState.registerErrors.slice();
                    newRegisterErrors.splice(index, 1)
                    return {
                        registerErrors: newRegisterErrors
                    }
                })
            } else if (type === 'success') {
                this.setState(prevState => {
                    const newRegisterErrors = prevState.registerSuccess.slice();
                    newRegisterErrors.splice(index, 1)
                    return {
                        registerSuccess: newRegisterErrors
                    }
                })
            }
        }
    }

    render() {
        const { classes } = this.props
        console.log(this.state.inputs)
        return (
            <React.Fragment>
                <SnackbarSpinner type="success" loading={this.state.loading} onClose={() => { }} />
                {/* Loop Through The Register Error To Create A Snackbar Of Errors */}
                {this.state.registerErrors.map((errorMessage, index) => (
                    <Snackbar
                        key={index}
                        type='error' message={errorMessage}
                        open={true} onClose={(event, reason) => this.clearRegisterErrors(event, reason, index, 'error')}
                    />
                ))}
                {/* Display the success snackbar */}
                {this.state.registerSuccess.map((successMessage, index) => (
                    <Snackbar
                        key={index}
                        type='success' message={successMessage}
                        open={true} onClose={(event, reason) => this.clearRegisterErrors(event, reason, index, 'success')}
                    />
                ))}

                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="referalId"
                            name="referalId"
                            label={<Typography component="span" variant="overline" className={classes.label}>Referal Id</Typography>}
                            fullWidth
                            error={!!this.state.referalIdError}
                            helperText={this.state.referalIdError}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.referalId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label={<Typography component="span" variant="overline" className={classes.label}>First name</Typography>}
                            fullWidth
                            error={this.state.firstNameError}
                            helperText={this.state.firstNameError ? 'First name is required' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            value={this.state.inputs.lastName}
                            label={<Typography component="span" variant="overline" className={classes.label}>Last name</Typography>}
                            fullWidth
                            error={this.state.lastNameError}
                            helperText={this.state.lastNameError ? 'Last name is required' : ''}
                            onChange={(e) => this.changeHandler(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            label={<Typography component="span" variant="overline" className={classes.label}>Phone Number</Typography>}
                            fullWidth
                            error={!!this.state.phoneNumberError}
                            helperText={this.state.phoneNumberError}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.phoneNumber}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label={<Typography component="span" variant="overline" className={classes.label}>E-mail</Typography>}
                            type="email"
                            fullWidth
                            error={!!this.state.emailError}
                            helperText={this.state.emailError}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="userName"
                            name="userName"
                            label={<Typography component="span" variant="overline" className={classes.label}>Username</Typography>}
                            fullWidth
                            error={!!this.state.userNameError}
                            helperText={this.state.userNameError}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.userName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label={<Typography component="span" variant="overline" className={classes.label}>Password</Typography>}
                            type="password"
                            fullWidth
                            error={this.state.passwordError}
                            helperText={this.state.passwordError ? 'Password should be at least six characters' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.password}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label={<Typography component="span" variant="overline" className={classes.label}>Password Again</Typography>}
                            fullWidth
                            error={this.state.confirmPassword}
                            helperText={this.state.confirmPassword ? 'Passwords does not match' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.confirmPassword}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl
                            error={true}
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name="termsAndCondition"
                                            onChange={(e) => this.changeHandler(e)}
                                        />
                                    }
                                    label={<Typography component="span" variant="overline" className={classes.label}>I hereby agree to the terms and condition</Typography>}
                                />
                                <FormHelperText>
                                    {this.state.termsAndConditionError ? 'You must agree to our terms and condition' : ''}
                                </FormHelperText>
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.submit}
                        className={classes.button}
                    >
                        Next
                    </Button>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(FirstForm);
