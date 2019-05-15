import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { StyleRulesCallback } from '@material-ui/core/styles';

const useStyles = makeStyles<StyleRulesCallback>(theme => ({
    root: {
        flexGrow: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999
    }
}));

interface props {
    show: boolean
}

const Progress = ({ show }: props) => {
    const classes = useStyles();
    return (
        show ?
            <div className={classes.root}>
                <LinearProgress className={classes.root} />
            </div>
            :
            null
    );
}

export default Progress;