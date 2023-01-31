import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

const signup = () => {
  const [createAccount, setCreateAccount] = useState(false);
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ name, email, password }) => {
    if (createAccount) {
      await signUp(name, email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/e451379a-dd0a-4657-b530-4ca4c0cb2aee/824792ad-b8aa-4b08-b07e-d0b70671996a/PH-en-20230123-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="login background image"
        fill
        className="object-cover -z-10 !hidden opacity-60 sm:!inline"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign Up</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              {...register("name", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] text-orange-500">
                Your name must contain between 4 and 30 characters.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setCreateAccount(true)}
        >
          Sign Up
        </button>
        <div className="text-[gray]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white hover:underline font-medium"
          >
            Sign in instead
          </Link>
        </div>
      </form>
    </div>
  );
};

export default signup;
