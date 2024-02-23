import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import StatusMessages, { useMessages } from './StatusMessages';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [messages, addMessage] = useMessages();

    const handleSubmit = async (e) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            addMessage('Stripe.js has not yet loaded.');
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log("binh_handleSubmit", { error, paymentMethod })
        return

        const { error: backendError, clientSecret } = await fetch(
            '/create-payment-intent',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodType: 'card',
                    currency: 'usd',
                }),
            }
        ).then((r) => r.json());

        if (backendError) {
            addMessage(backendError.message);
            return;
        }

        addMessage('Client secret returned');

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: 'Jenny Rosen',
                    },
                },
            }
        );

        if (stripeError) {
            // Show error to your customer (e.g., insufficient funds)
            addMessage(stripeError.message);
            return;
        }

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    };

    return (
        <div>
            <h1>Card</h1>

            <p>
                <h4>Try a <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer">test card</a>:</h4>
                <div>
                    <code>4242424242424242</code> (Visa)
                </div>
                <div>
                    <code>5555555555554444</code> (Mastercard)
                </div>
                <div>
                    <code>4000002500003155</code> (Requires <a href="https://www.youtube.com/watch?v=2kc-FjU2-mY" target="_blank" rel="noopener noreferrer">3DSecure</a>)
                </div>
            </p>

            <form id="payment-form" onSubmit={handleSubmit}>
                <label htmlFor="card">Card</label>
                <CardElement id="card" />

                <button type="submit">Pay</button>
            </form>
            <StatusMessages messages={messages} />

            <p> <a href="https://youtu.be/IhvtIbfDZJI" target="_blank">Watch a demo walkthrough</a> </p>
        </div>
    );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const StripeCheckoutButton = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);



export default StripeCheckoutButton;