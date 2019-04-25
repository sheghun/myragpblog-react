import React, { Component } from 'react';

// * Material Components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import withStyles from '@material-ui/core/styles/withStyles'
import FormHelperText from '@material-ui/core/FormHelperText';

// * Personal Components
import Snackbar from '../../Components/Snackbar/Snackbar'
import SnackbarSpinner from '../../Components/SnackbarSpinner/SnackbarSpinner'

// * Axios
import Axios from 'axios';
// * To handle the query parameters in the url
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

class SecondForm extends Component {

    // Parse the queryString
    queryString = queryString.parse(this.props.location.search)

    // Osoftpay form reference
    osoftpayForm

    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                bank: 0,
                package: 0,
                phoneNumber: '',
                accountName: '',
                accountNumber: '',
                whatsappNumber: '',
                bankAccountType: 0,
            },

            // For controling the loading spinner
            loading: false,

            // For checking if form has been submited
            submited: false,

            // Register Responses
            registerErrors: [],
            registerSuccess: [],

            // Selectors
            banks: [],
            bankAccountTypes: [],
            packages: [],

            // Inputs Errors
            bankError: false,
            packageError: false,
            phoneNumberError: false,
            accountNameError: false,
            accountNumberError: false,
            whatsappNumberError: false,
            bankAccountTypeError: false,

            // Osoftpay Inputs
            payment: {
                redirectUrl: `${window.location.origin}/payment/verifyPayment${this.props.location.search}`,
            },
        }
    }

    componentDidMount() {
        Axios.get('/register/banks')
            .then(response => this.setState({ banks: response.data }))
        Axios.get('/register/banks/account_types')
            .then(response => this.setState({ bankAccountTypes: response.data }))
        Axios.get('/register/packages')
            .then(response => this.setState({ packages: response.data }))
    }

    /**
     * Handle the inputs
     */
    handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState(prevState => ({ inputs: { ...prevState.inputs, [name]: value } }))
    }

    /**
     * Validate the inputs
     */
    validate(inputs, callback) {
        // Initialize the error
        const error = []
        for (const value in inputs) {

            switch (value) {


                // Validate the bank
                case 'bank':
                    if ((inputs[value] > 0) || inputs[value] !== 0) {
                        this.setState({ bankError: false })
                    } else {
                        this.setState({ bankError: true })
                        error.push('Bank Error')
                    }
                    break;



                // Validate the phoneNumber
                case 'phoneNumber':
                    if (inputs[value].length === 11) {
                        this.setState({ phoneNumberError: false })
                    } else {
                        this.setState({ phoneNumberError: true })
                        error.push('Phone Number Error')
                    }
                    break;



                // Validate the whatsappNumber
                case 'whatsappNumber':
                    if (inputs[value].length === 11) {
                        this.setState({ whatsappNumberError: false })
                    } else {
                        this.setState({ whatsappNumberError: true })
                        error.push('WhatsApp Number Error')
                    }
                    break;



                // Validate the package
                case 'package':
                    if (inputs[value] !== 0) {
                        this.setState({ packageError: false })
                    } else {
                        this.setState({ packageError: true })
                        error.push('Package Error')
                    }
                    break;



                // Validate the accountName
                case 'accountName':
                    if (inputs[value].length > 0) {
                        this.setState({ accountNameError: false })
                    } else {
                        this.setState({ accountNameError: true })
                        error.push('Account Name Error')
                    }
                    break;



                // Validate the accountNumber
                case 'accountNumber':
                    if (inputs[value].length > 0) {
                        this.setState({ accountNumberError: false })
                    } else {
                        this.setState({ accountNumberError: true })
                        error.push('Account Number Error')
                    }
                    break



                // Validate the accountType
                case 'bankAccountType':
                    if (inputs[value] !== 0) {
                        this.setState({ bankAccountTypeError: false })
                    } else {
                        this.setState({ bankAccountTypeError: true })
                        error.push('Bank Account Type Error')
                    }
                    break;



                default:
                    // Do nothing
                    break;
            }
        }

        if (error.length === 0) callback(false)
        else callback(true)
    }


    /**
     * Sumit the form to the server
     */
    submit = () => {
        // Run the validation
        this.validate(this.state.inputs, err => {
            if (!err) {

                // Set the loading state
                this.setState({ loading: true })

                // Send the request
                Axios.post('/register', { ...this.state.inputs, step: 2, username: this.queryString.username },{
                        withCredentials: true
                }).then(response => {

                        // Check the response data
                        const resp = response.data
                        this.setState({ loading: false })

                        // If request is successful
                        if (resp.success) {
                            this.setState({
                                registerSuccess: ['Succesful'],
                                submited: true
                            })
                            this.props.history.push(
                                `/payment/makePayment?id=${resp.success.userId}
                                &redirectUrl=${this.state.payment.redirectUrl}
                                `
                            )

                        } else if (resp.error) {
                            this.setState({ registerErrors: resp.error })
                        } else if (resp.redirect) {
                            this.props.history.push(resp.redirect)
                        }
                    })
            } else {
                // Do nothing
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
        return (
            <React.Fragment>
                {/* Loading spinner */}
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardName"
                            label="Phone Number"
                            name="phoneNumber"
                            fullWidth
                            error={this.state.phoneNumberError}
                            helperText={
                                this.state.phoneNumberError ? 'Phone number is required and must be 11 digits'
                                    : 'This is the phone number that will be displayed on your blog'
                            }
                            onChange={this.handleChange}
                            value={this.state.inputs.phoneNumber}
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            label="Whatsapp number"
                            name="whatsappNumber"
                            fullWidth
                            error={this.state.whatsappNumberError}
                            helperText={
                                this.state.whatsappNumberError ? 'WhatsApp number is required and must be 11 digits'
                                    : 'The whatsapp number to be displayed on your blog'
                            }
                            onChange={this.handleChange}
                            value={this.state.inputs.whatsappNumber}

                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required id="expDate"
                            label="Account name"
                            name="accountName"
                            fullWidth
                            error={this.state.accountNameError}
                            helperText={
                                this.state.accountNameError ?
                                    'Your account name is required so that it can be used to process future transactions'
                                    : ''
                            }
                            value={this.state.inputs.accountName}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            label="Account number"
                            name="accountNumber"
                            fullWidth
                            error={this.state.accountNumberError}
                            helperText={
                                this.state.accountNumberError ?
                                    'Your account number is required so that it can be used to process future transactions'
                                    : ''
                            }
                            value={this.state.inputs.accountNumber}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={this.state.bankAccountTypeError}>
                            <InputLabel htmlFor="bankAccountType">Account Type</InputLabel>
                            <Select
                                native
                                value={this.state.inputs.bankAccountType}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'bankAccountType',
                                    id: 'bankAccountType',
                                }}
                            >
                                <option value={0}>Choose Your Account Type</option>
                                {this.state.bankAccountTypes.map((accountType, index) => (
                                    <option value={accountType.id} key={index}>
                                        {accountType.name.charAt(0).toUpperCase() + accountType.name.slice(1)}
                                    </option>
                                ))}
                            </Select>
                            <FormHelperText>
                                {this.state.bankAccountTypeError ?
                                    'Your account type is required so that it can be used to process future transactions'
                                    : ''}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={this.state.bankError}>
                            <InputLabel htmlFor="bank">Bank</InputLabel>
                            <Select
                                native
                                onChange={this.handleChange}
                                value={this.state.inputs.bank}
                                inputProps={{
                                    name: 'bank',
                                    id: 'bank',
                                }}
                            >
                                <option value={0}>Choose Your Bank</option>
                                {this.state.banks.map((bank, index) => (
                                    <option value={bank.id} key={index}>{bank.name}</option>
                                ))}
                            </Select>
                            <FormHelperText>
                                {this.state.bankError ?
                                    'Your bank is required so that it can be used to process future transactions'
                                    : ''}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={this.state.packageError}>
                            <InputLabel htmlFor="package">Packages</InputLabel>
                            <Select
                                native
                                onChange={this.handleChange}
                                value={this.state.inputs.package}
                                inputProps={{
                                    name: 'package',
                                    id: 'package',
                                }}
                            >
                                <option value={0}>Choose Your Package</option>
                                {this.state.packages.map((packageInfo, index) => (
                                    <option value={packageInfo.id} key={index}>{packageInfo.name}</option>
                                ))}
                            </Select>
                            <FormHelperText>
                                {this.state.bankError ?
                                    'Your package type is required so that it can be used to process future transactions'
                                    : ''}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {this.state.submited ?
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.makePayments}
                        >
                            Proceed To Payments
                        </Button>
                        :
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.submit}
                            style={{ marginTop: '32px', marginLeft: '32px' }}
                        >
                            Next
                        </Button>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SecondForm);