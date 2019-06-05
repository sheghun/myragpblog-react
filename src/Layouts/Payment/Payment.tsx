import React from "react";
import { Route } from "react-router-dom";
import MakePayment from "../../Views/Payment/MakePayment";
import VerifyPayment from "../../Views/Payment/VerifyPayment";

const routes = [
	{ path: "/payment/verify-payment", component: VerifyPayment },
	{ exact: true, path: "/payment", component: MakePayment },
];

const Payment = () => {
	return (
		<>
			{routes.map((route, i) =>
				route.exact ?
					<Route exact={true} key={i} path={route.path} component={route.component} />
					:
					<Route key={i} path={route.path} component={route.component} />,
			)}
		</>
	);
};

export default Payment;
