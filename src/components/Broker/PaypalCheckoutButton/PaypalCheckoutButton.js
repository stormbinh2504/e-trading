import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { PayPalButtons, usePayPalHostedFields } from "@paypal/react-paypal-js";

import "./PaypalCheckoutButton.scss"
const PaypalCheckoutButton = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { product, onSubmit } = props;
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        // alert("Thank you for your purchase!");
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }


    const handleApprove = (data, orderId) => {
        // Call backend function to fulfill order
        console.log("binh_handleApprove", orderId)
        // if response is success
        setPaidFor(true);
        onSubmit && onSubmit()
        // Refresh user's account or subscription status

        // if response is error
        // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    };

    const onCancel = () => {
        console.log("paypal_onCancel")
        setPaidFor(false);
    }

    return (
        <>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    value: product.price
                                }
                            }
                        ]
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("PayPal onApprove", data, actions);

                    handleApprove(data, order);
                }}
                onError={(err) => {
                    setError(err);
                    console.error("PayPal Checkout onError", err);
                }}
                onCancel={() => {
                    // Display cancel message, modal or redirect user to cancel page or back to cart
                    onCancel();
                }}
                onClick={(data, actions) => {
                    // Validate on button click, client or server side
                    const hasAlreadyBoughtCourse = false;

                    if (hasAlreadyBoughtCourse) {
                        setError(
                            "You already bought this course. Go to your account to view your list of courses."
                        );

                        return actions.reject();
                    } else {
                        return actions.resolve();
                    }
                }}
            />
        </>
    )
}

export default PaypalCheckoutButton