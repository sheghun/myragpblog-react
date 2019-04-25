import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerAction } from '../../../../Store/Actions/Actions';
import classes from '../Register.module.css'
import queryString from 'query-string'
import Spinner from '../../../../Components/Spinner/Spinner'
import Input from '../../../../Components/Input/Input'

export class SecondForm extends Component {
    static propTypes = {

    }
    queryString = queryString.parse(this.props.location.search)
    form

    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                number: '',
                whatsapp: '',
                packageType: 0,
                redirectUrl: `http://localhost:3000${this.props.match.url.slice(0, -1)}3${this.props.location.search}`
            },
            osoftpay: {
                redirectUrl: `http://localhost:3000${this.props.match.url.slice(0, -1)}3${this.props.location.search}`,
                merchantNumber: 'g3ggdgsi1.gns4g.',
                transactionType: 2,
                transactionReference: '',
                customerName: '',
                customerId: '',
                paymentItemName: '',
                testPaymentItemName: 'TestServiceName1',
                Amount: '',
                hash: '',

            },
            numberError: false,
            whatsappError: false,
            packageTypeError: false,
            submitted: false
        }
    }

    submitHandler = async (e) => {
        await this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                username: this.queryString.username,
                submitted: true
            }
        }))
        if (this.validate()) {
            await this.props.registerAction(this.state.inputs, this.props.match.params.step)
            await this.setState(prevState => {
                console.log(this.props.register.success)
                return {
                    osoftpay: {
                        ...prevState.osoftpay,
                        ...this.props.register.success
                    }
                }
            })
                this.form.submit()
        }
        console.log(this.state)
    }




    validate = () => {
        const { inputs } = this.state;
        for (const input in inputs) {
            const value = inputs[input]

            switch (input) {
                case 'number':
                    if (value === '' || value.length < 11) {
                        this.setState({ numberError: true })
                        return false
                    } else {
                        this.setState({ numberError: false })
                    }
                    break;

                case 'whatsapp':
                    if (value === '' || value.length < 11) {
                        this.setState({ whatsappError: true })
                        return false
                    } else {
                        this.setState({ whatsappError: false })
                    }
                    break;

                case 'packageTypeError':
                    if (value === 0) {
                        this.setState({ packageTypeError: true })
                        return false
                    } else {
                        this.setState({ packageTypeError: false })
                    }
                    break;
                default:
                    return true;
            }
        }
        return true;
    }

    changeHandler = async event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        await this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }

            }
        })
    }

    blurHandler = e => {
        if (this.state.submitted) {
            this.validate()
        }
    }


    render() {
        const { number, whatsapp, packageType, osoftpay } = this.state;
        const inputErrorClasses = [classes.input, classes.inputerror]
        const inputClasses = [classes.input]
        const errorClass = (error) => {
            return error ? inputErrorClasses.join(' ') : inputClasses.join(' ')
        }

        const errorWarning = (error, name) => {
            return error ? <small>{`${name}`} is required</small> : <div></div>
        }

        const spinner = () => {
            return this.props.loading ? <Spinner /> : null
        }
        let errors;
        if (this.props.register.hasOwnProperty('errors')) {
            errors = this.props.register.errors.map(
                (error, index) => <p key={index} className={classes.errors}>{error}</p>
            )
        } else if (this.props.register.success) {
            errors = null;
            console.log(this.props.register.success)
        }
        return (
            <div className="base">
                {spinner()}
                <div className={classes.fix}></div>
                <form
                    ref={(ref) => this.form = ref}
                    action="https://developer.osoftpay.net/api/TestPublicPayments"
                    method="post"
                    className={classes.form} onSubmit={this.submitHandler}
                >
                    <div>
                        <i style={{ fontSize: 32 }} className="icon ion-ios-create"></i>
                        <div className={classes.heading}>
                            <h2>Register</h2>
                            <p>With Us</p>
                        </div>
                    </div>

                    {errors}

                    <div className={classes.inputwrapper}>
                        <label>Phone Number:</label>
                        <Input
                            value={number}
                            onBlur={(e) => this.blurHandler(e)}
                            className={errorClass(this.state.numberError)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="number"
                            placeholder="e.g:   08143112637"
                        />
                        {errorWarning(this.state.numberError, 'Phone Number')}
                    </div>

                    <div className={classes.inputwrapper}>
                        <label>Whatsapp Number:</label>
                        <Input
                            value={whatsapp}
                            onBlur={(e) => this.blurHandler(e)}
                            className={errorClass(this.state.whatsappError)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="whatsapp"
                            placeholder="e:g   09035647621"
                        />
                        {errorWarning(this.state.whatsappError, 'Whatsapp Number')}
                    </div>
                    <input name="TransactionType" value="2" type="hidden" />
                    <input name="MerchantNumber" value={osoftpay.merchantNumber} type="hidden" />
                    <input name="SiteRedirectURL" value={osoftpay.redirectUrl} type="hidden" />
                    <input name="TransactionReference" value={osoftpay.transactionReference} type="hidden" />
                    <input name="CustomerName" value={osoftpay.customerName} type="hidden" />
                    <input name="CustomerId" value={osoftpay.customerId} type="hidden" />
                    <input name="PaymentItemName" value={osoftpay.testPaymentItemName} type="hidden" />
                    <input name="Amount" value={osoftpay.Amount} type="hidden" />
                    <input name="Hash" value={osoftpay.hash} type="hidden" />
                    <div className={classes.inputwrapper}>
                        <label>Package</label>
                        <select
                            value={packageType}
                            onBlur={(e) => this.blurHandler(e)}
                            className={errorClass(this.state.packageTypeError)}
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            name="packageType"
                        >
                            <option value={0} selected disabled>Choose a Package</option>
                            <option value={1}>Beginner (₦2,000)</option>
                            <option value={2}>Professional (₦5,000)</option>
                            <option value={3}>Professional (₦10,000)</option>
                        </select>
                        {errorWarning(this.state.packageTypeError, 'Package type')}
                    </div>

                    <div className={classes.buttonwrapper}>
                        <button
                            onMouseOver={this.validate}
                            type="button"
                            onClick={this.submitHandler}
                            className={classes.button}>Continue &amp; Pay</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error,
    register: state.register
})

const mapDispatchToProps = dispatch => ({
    registerAction: (inputs, step) => dispatch(registerAction(inputs, step))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SecondForm))
