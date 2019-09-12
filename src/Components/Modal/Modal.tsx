import React, {ReactNode} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

type props = {
    open: boolean;
    onClose: () => void;
    children: any;
};

const SimpleModal = ({open, onClose, children}: props): ReactNode => {
    return (
        <>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={onClose}
            >
                <>{children}</>
            </Modal>
        </>
    );
};

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
// @ts-ignore
const SimpleModalWrapped = withStyles()(SimpleModal);

export default SimpleModalWrapped;
