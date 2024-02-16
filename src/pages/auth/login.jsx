import Input from "@/components/UI/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { push, query } = useRouter();
  const callbackUrl = query?.callbackUrl || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!response?.error) {
        form.reset();
        push(callbackUrl);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[350px]">
        <h1 className="text-3xl font-bold font-serif text-center mb-6">
          Login
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input id={"email"} label={"Email"} type={"email"} />
          <Input id={"password"} label={"Password"} type={"password"} />
          <button
            type="submit"
            className="bg-blue-500 text-white  px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className="bg-slate-300 text-slate-700 text-base font-semibold px-4 py-2 rounded-md w-full mt-3 hover:text-slate-950 hover:bg-slate-400"
        >
          Login With Google
          <FcGoogle className="inline-block ml-2 text-3xl" />
        </button>
        <h3 className="text-center text-lg mt-3">
          Don{"'"}t have an account?{" "}
          <Link href={"/auth/register"} className="text-blue-500">
            Register
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
