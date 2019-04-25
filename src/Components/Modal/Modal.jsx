import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const SimpleModal = (props) =>  {
        return (
            <>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={props.open}
                    onClose={props.onClose}
                >
                    <>
                        {props.children}
                    </>
                </Modal>
            </>
        );
    }

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles()(SimpleModal);

export default SimpleModalWrapped;