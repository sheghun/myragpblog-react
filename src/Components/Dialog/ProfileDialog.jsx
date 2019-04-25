import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const AlertDialogSlide = (props) => {
    return (
      <>
        <Dialog
          open={props.open}
          TransitionComponent={Transition}
          keepMounted
                onClose={props.onClose}
                onBackdropClick={props.onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
            >
                <img src={props.img} height={"100%"} />
                <CloseIcon />
          
        </Dialog>
      </>
    );
}

export default AlertDialogSlide;