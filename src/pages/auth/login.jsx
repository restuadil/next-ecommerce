import AuthLayouth from "@/Layout/AuthLayouth";
import Input from "@/components/UI/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayouth
      title={"Login"}
      redirect={"Register"}
      link={"/auth/register"}
      textLink={`Don't have an account ? ${""}`}
    >
      <form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
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
        className="bg-slate-300 text-slate-700 text-base font-semibold px-4 py-2 rounded-md w-1/3 mt-3 hover:text-slate-950 hover:bg-slate-400"
      >
        Login With Google
        <FcGoogle className="inline-block ml-2 text-3xl" />
      </button>
    </AuthLayouth>
  );
};

export default Login;
