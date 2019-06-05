import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { StyleRulesCallback } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles<StyleRulesCallback>((_) => ({
	wrapper: {
		height: "auto",
		marginBottom: "auto",
		marginTop: "auto",
	},
}));

const VerifyPayment = () => {
	const classes = useStyles();

	return (
		<>
			<Grid className={classes.wrappoer} container={true} justify="center" style={{ border: "solid 1px red" }}>
				<Grid xs={12} sm={8} md={6}>
					<Paper>
						<h1>Fuck you</h1>

					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default VerifyPayment;
