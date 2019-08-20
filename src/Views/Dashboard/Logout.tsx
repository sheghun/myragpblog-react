import Axios from "axios";
import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";

const LogOut = (props: RouteComponentProps) => {

	const { history } = props;

	useEffect(() => {
		// Asynchronous function
		(async () => {
			const response = await Axios.get("/user/logout");
			if (response.status === 200) {
				history.push("/");
			}
		})();
	});

	return <Spinner />;
};

export default withRouter(LogOut);
