import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Snackbar from "../Snackbar/Snackbar.jsx";

const SnackbarSpinner = (props: { loading: boolean, onClose?: any }) => {
	return props.loading ?
		// @ts-ignore
		<Snackbar
			place="tl"
			color="info"
			type="loading"
			message={
				<>
					<CircularProgress color="primary" size={18} />
					<Typography
						color="primary"
						style={{
							marginLeft: "2rem",
						}}
					>
						Loading...
					</Typography>
				</>
			}
			open={true}
			onClose={props.onClose}
			closeNotification={props.onClose}
			close={true}
		/>
		:
		null;
};

export default SnackbarSpinner;
