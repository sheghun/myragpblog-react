import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        position: 'absolute',
        top: '30%',
    },
    overlay: {
        zIndex: 10,
        position: 'fixed',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: '100rem',
        width: '100rem'
    }
});

function CircularIndeterminate(props) {
    const { classes } = props;
    return (
        props.show ? 
            <div className={classes.overlay} >
                <CircularProgress className={classes.progress} />
                <CircularProgress className={classes.progress} color="secondary" />
            </div>
            : null
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);