import Input from "@/components/UI/Input";
import Link from "next/link";
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
    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
    <div className="flex justify-center items-center h-screen">
      <div className="w-[350px]">
        <h1 className="text-3xl font-bold font-serif text-center mb-6">
          Register
        </h1>
        <span className="text-red-500">{error}</span>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input id={"email"} label={"Email"} type={"email"} />
          <Input id={"fullname"} label={"FullName"} type={"text"} />
          <Input id={"phone"} label={"Phone"} type={"text"} />
          <Input id={"password"} label={"Password"} type={"password"} />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <h3 className="text-center text-lg mt-3">
          Have an account?{" "}
          <Link href={"/auth/login"} className="text-blue-500">
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Page;
