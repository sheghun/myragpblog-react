import React from 'react'
import './Pricing.css';
// @ts-ignore
import PaystackButton from 'react-paystack';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'



const Pricing = (props: any) => {

    const publicKey = 'pk_test_280234dd00c545ce2524f2a08934587c58023472';

    const callback = (response: any) => {
        console.log(response);
    }

    const close = () => {
        console.log('Payment Closed');
    }

    const getReference = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=_";
        for (let i = 0; i < 15; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    return (
        <>
            <div className="pricing-table">
                <div className="pricing-option">
                    <AccountBalanceWalletIcon />
                    <h1>Payment</h1>
                    <hr />
                    <p>For your prospects to continue viewing your information on our platform you need to subscribe to our service for just &#8358;2,000 monthly, it's a small fee</p>
                    <hr />
                    <div className="price">
                        <div className="front">
                            <span className="price">2,000 <b>&#8358;</b></span>
                        </div>
                        <div className="back">
                            <PaystackButton
                                text="Make Payment"
                                class="button"
                                callback={callback}
                                close={close}
                                reference={getReference()}
                                email="sheghunoladiran9@gmail.com"
                                amount={5000}
                                paystackkey={publicKey}
                                tag="button"
                            />
                            <a href="#" className="button">Purchase now</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pricing;