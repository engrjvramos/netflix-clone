import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import Membership from "../components/Membership";
import { goToBillingPortal } from "../lib/stripe";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface Props {
  products: Product[];
}

function Account({ products }: Props) {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const manageSubscription = () => {
    if (subscription) {
      setIsBillingLoading(true);
      goToBillingPortal();
    }
  };

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158"
            width={120}
            height={120}
            alt="Netflix"
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
            alt=""
            className="cursor-pointer rounded h-10 w-10"
          />
        </Link>
      </header>

      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img
              src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg"
              alt=""
              className="h-7 w-7"
            />
            <p className="text-sm md:text-base font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>
        <Membership />
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product,
              )[0]?.name
            }
          </div>
          <p
            className="cursor-pointer text-blue-500 hover:underline md:text-right relative"
            onClick={manageSubscription}
          >
            {isBillingLoading ? (
              <CgSpinner className="animate-spin h-7 w-7 text-gray-200 dark:text-transparent dark:fill-[#e50914] absolute right-0" />
            ) : (
              "Change Plan"
            )}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
