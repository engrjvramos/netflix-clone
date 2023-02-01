import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "@firebase/functions";
import app from "../firebase";
import { toast } from "react-toastify";

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
    .then((snapshot) => {
      window.location.assign(snapshot.url);
      toast.success("Successfully subscribed");
    })
    .catch((error) => toast.error(error.message));
};

const goToBillingPortal = async () => {
  const instance = getFunctions(app, "us-central1");
  const functionRef = httpsCallable(
    instance,
    "ext-firestore-stripe-payments-createPortalLink",
  );

  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => toast.error(error.message));
};

export { loadCheckout, goToBillingPortal };
export default payments;
