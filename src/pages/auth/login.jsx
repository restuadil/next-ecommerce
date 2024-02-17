import AuthLayout from "@/Layout/AuthLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [error, setError] = useState("");
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
        setError("Invalid Email or Password");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout
      title={"Login"}
      redirect={"Register"}
      link={"/auth/register"}
      textLink={`Don't have an account ? ${""}`}
      error={error}
    >
      <div className=" w-1/3">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input id={"email"} label={"Email"} type={"email"} required={true} />
          <Input
            id={"password"}
            label={"Password"}
            type={"password"}
            required={true}
          />
          <Button
            type={"submit"}
            className={"mt-2 rounded-md py-1.5 w-full text-white"}
          >
            Login
          </Button>
        </form>

        <Button
          type={"button"}
          variant={"primary"}
          className={"mt-2 w-full rounded-md py-1.5 text-white"}
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          Login With Google
          <FcGoogle className="inline-block ml-2 text-3xl" />
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
