import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
          onClose={props.disagree}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Notification"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.disagree} color="primary">
              No
            </Button>
            <Button onClick={props.agree} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}

export default AlertDialogSlide;