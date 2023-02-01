import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "@firebase/functions";
import app from "../firebase";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const loadCheckout = async (priceID: string) => {
  await createCheckoutSession(payments, {
    price: priceID,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message));
};

export { loadCheckout };
export default payments;
