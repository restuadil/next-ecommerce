import AuthLayout from "@/Layout/AuthLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        npp: form.npp.value,
        password: form.password.value,
        callbackUrl,
      });
      console.log(response);
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
      // redirect={"Register"}
      link={"/auth/register"}
      textLink={`Don't have an account ? ${""}`}
      error={error}
    >
      <div className=" w-1/3">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input id={"npp"} label={"Npp"} type={"text"} required={true} />
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
      </div>
    </AuthLayout>
  );
};

export default Login;
