import AuthLayout from "@/Layout/AuthLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import authServices from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      setIsLoading(true);
      form.reset();
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email Already Exists, Plesase Try Another Email");
    }
  };
  return (
    <AuthLayout
      title={"Register"}
      redirect={"Login"}
      link={"/auth/login"}
      textLink={`Already have an account ? ${""}`}
      error={error}
    >
      <form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
        <Input required={true} id={"email"} label={"Email"} type={"email"} />
        <Input
          required={true}
          id={"fullname"}
          label={"FullName"}
          type={"text"}
        />
        <Input required={true} id={"phone"} label={"Phone"} type={"text"} />
        <Input
          required={true}
          id={"password"}
          label={"Password"}
          type={"password"}
        />
        <Button
          type="submit"
          className="mt-2 rounded-md py-1.5 w-full text-white"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Page;
