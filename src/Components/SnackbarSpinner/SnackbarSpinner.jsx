import React from 'react'
import Snackbar from "../Snackbar/Snackbar.jsx";
import CircularProgress from '@material-ui/core/CircularProgress'

const SnackbarSpinner = props => {
    return props.loading ?
        <Snackbar
            place="tl"
            color="info"
            type="loading"
            message={
                <>
                    <CircularProgress size={18} />
                    <p style={{ color: 'red', marginLeft: '1rem', fontWeight: '700' }}>Loading...</p>
                </>
            }
            open={true}
            onClose={props.onClose}
            closeNotification={props.onClose}
            close
        />
        :
        null
}

export default SnackbarSpinner