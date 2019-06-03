import React from "react"
import MakePayment from "../../Views/Payment/MakePayment";
import VerifyPayment from "../../Views/Payment/VerifyPayment";
import { Route } from "react-router-dom";

const routes = [
	{ path: "/payment", component: MakePayment },
	{ path: "/payment/verify-payment", component: VerifyPayment },
];

const Payment = () => {
	return (
		<>
			{routes.map((route, i) =>
				<Route key={i} path={route.path} component={route.component} />
			)}
		</>
	);
};

export default Payment;
