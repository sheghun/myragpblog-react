import Button from "@material-ui/core/Button";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./NotFound.css";

const NotFound = ({history}: RouteComponentProps) => {
	return (
		<div id="notfound">
			<div className="notfound">
				<div className="notfound-404">
					<h1>4<span>0</span>4</h1>
				</div>
				<h2>the page you requested could not found</h2>
				<Button
					variant="contained"
					color="primary"
					onClick={() => history.push("/")}
					fullWidth={true}
				>
					Go To The Home Page
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
