import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
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
                ragpReferalId: '',
                passwordAgain: '',
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
            ragpReferalIdError: false,
            passwordAgainError: false,
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
     * Required: email, lastName, firstName, password, passwordAgain, username, referalId, ragpReferalId, termsAndCondition
     */
    validate = (inputs, callback) => {
        function validateEmail(email) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        }
        // For storing the errors
        const error = []
        // VAlidate inputs
        for (const value in inputs) {
            switch (value) {
                // Validate Referal Id
                case 'referalId':
                    if (inputs[value].length > 0 && typeof (inputs[value]) === 'string') {
                        this.setState({ referalIdError: false })
                    } else {
                        this.setState({ referalIdError: true })
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
                        this.setState({ emailError: true })
                        error.push('email')
                    }
                    break;

                // Validate Username
                case 'userName':
                    if (inputs[value].length > 0 && typeof (inputs[value]) === 'string') {
                        this.setState({ userNameError: false })
                    } else {
                        this.setState({ userNameError: true })
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
                case 'passwordAgain':
                    if (inputs[value] === inputs['password']) {
                        this.setState({ passwordAgainError: false })
                    } else {
                        this.setState({ passwordAgainError: true })
                        error.push('passwordAgain')
                    }
                    break;

                // Validate Recharge And Get Paid Referal Id
                case 'ragpReferalId':
                    if(inputs[value].length > 0) {
                        this.setState({ragpReferalIdError: false})
                    } else {
                        this.setState({ragpReferalIdError: true})
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
        if (error.length === 0) callback(false)
        else callback(true)
    }

    submit = event => {
        // Validate inputs first
        this.validate(this.state.inputs, err => {
            console.log(err)
            if (!err) {
                this.setState({ loading: true })
                Axios.post('/register', { ...this.state.inputs, step: 1 }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                })
                    .then(response => {
                        const resp = response.data
                        this.setState({ loading: false })
                        console.log(response)
                        if (resp.error) {
                            this.setState({ registerErrors: resp.error })
                        } else if (resp.success) {
                            this.setState({ registerSuccess: ['Successful'] })
                            setTimeout(() => {
                                this.props.history.push(`2?username=${this.state.inputs.userName}`)
                            }, 3000);
                        }
                    })
            } else {
                // Just stop execution and return nothing
                return
            }
        })
    }

    /**
     * For removing unique eorrs using their index from the "this.state.registerErrors"
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
        console.log(this.state)
        const { classes } = this.props
        return (
            <React.Fragment>
                <SnackbarSpinner loading={this.state.loading} onClose={() => { }} />
                {/* Loop Through The Register Error To Create A Snackbar Of Errors */}
                {this.state.registerErrors.map((errorMessage, index) => (
                    <Snackbar
                        key={index}
                        type='error' message={errorMessage}
                        open={true} onClose={(event, reason) => this.clearRegisterErrors(event, reason, index, 'error')}
                    />
                ))}
                {/* Dispay the success snackbar */}
                {this.state.registerSuccess.map((successMessage, index) => (
                    <Snackbar
                        key={index}
                        type='success' message={successMessage}
                        open={true} onClose={(event, reason) => this.clearRegisterErrors(event, reason, index, 'success')}
                    />
                ))}

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="referalId"
                            name="referalId"
                            label="Referal Id"
                            fullWidth
                            error={this.state.referalIdError}
                            helperText={this.state.referalIdError ? 'Referal Id is required before signing up' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.referalId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            autoComplete="fname"
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
                            label="Last name"
                            fullWidth
                            error={this.state.lastNameError}
                            helperText={this.state.lastNameError ? 'Last name is required' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            autoComplete="lname"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="E-mail"
                            type="email"
                            fullWidth
                            error={this.state.emailError}
                            helperText={this.state.emailError ? 'A valid email is required' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="userName"
                            name="userName"
                            label="Username"
                            fullWidth
                            error={this.state.userNameError}
                            helperText={this.state.userNameError ? 'Username is required before signing up' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.userName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
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
                            id="passwordAgain"
                            name="passwordAgain"
                            type="password"
                            label="Password Again"
                            fullWidth
                            error={this.state.passwordAgainError}
                            helperText={this.state.passwordAgainError ? 'Passwords does not match' : ''}
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.passwordAgain}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ragpReferalId"
                            name="ragpReferalId"
                            type="text"
                            label="Recharge And Get Paid"
                            fullWidth
                            error={this.state.ragpReferalIdError}
                            helperText={this.state.ragpReferalIdError ?
                                'Recharge And Get Paid referal Id is needed' : ''
                            }
                            onChange={(e) => this.changeHandler(e)}
                            value={this.state.inputs.ragpReferalId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                                    label="I hereby agree to the terms and condition"
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
