import React, { Component } from 'react'
import Spinner from '../../Components/Spinner/Spinner'
import { connect } from 'react-redux'

export class ErrorWrapper extends Component {
    render() {
        if (this.props.loading) {
            return <Spinner />
        }
        if (this.props.error) {
            return (
                <h1>{this.props.error.message}</h1>
            )
        } else {
            return (this.props.children)
        }
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorWrapper)


