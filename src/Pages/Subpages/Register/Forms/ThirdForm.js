import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerAction } from '../../../../Store/Actions/Actions'
import queryString from 'query-string'
import Aux from '../../../../Hoc/Aux/Aux'
import classes from '../Register.module.css'
import Spinner from '../../../../Components/Spinner/Spinner';

export class ThirdForm extends Component {

    queryString = queryString.parse(this.props.location.search)

    componentDidMount() {
        
        if (this.queryString.TransactionReference) {
            this.props.registerAction(this.queryString, this.props.match.params.step)
            return
        }
        this.props.history.push(`/${this.queryString.referer}`)
    }

    payHandler = () => {
        this.props.history.push(`2`)
    }

    login = () => {
        this.props.history.push('/home/login')
    }

    render() {
        //   Strictly Code
        const { loading } = this.props
        const { errors, success } = this.props.register
        let message = null
        if (errors) {
            message = this.props.register.errors.map(
                (error, index) => <p key={index} className={classes.errors}>{error}</p>
            )
        } else if (success) {
            message = this.props.register.success.map(
                (success, index) => <p key={index} className={classes.errors}>{success}</p>
            )
        }
        return (
            (loading ?
                <Spinner />
                :
                <Aux>
                    <div className={classes.transactionerrors}>
                        {message}
                        {errors ?
                            <button
                                className={classes.trybtn}
                                onClick={this.payHandler}
                            >
                                Pay Again
                            </button>
                            :
                            <a
                                className={classes.trybtn}
                                href="/home/login"
                            >
                                Login
                        </a>
                        }
                    </div>
                </Aux>
            )
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    register: state.register
})

const mapDispatchToProps = dispatch => ({
    registerAction: (inputs, step) => dispatch(registerAction(inputs, step))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThirdForm))
