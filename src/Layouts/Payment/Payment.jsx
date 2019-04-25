import React from 'react'
import { Route } from 'react-router-dom';

const MakePayment = React.lazy(() => import('../../Views/Payment/MakePayment'))
const VerifyPayment = React.lazy(() => import('../../Views/Payment/VerifyPayment'))


const Payment = (props) => {
    return (
        <>
            <Route path={`${props.match.url}/makePayment`} component={MakePayment} />
            <Route path={`${props.match.url}/verifyPayment`} component={VerifyPayment} />
        </>
    )
}

export default Payment