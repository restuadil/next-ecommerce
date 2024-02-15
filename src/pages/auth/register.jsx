import Input from "@/components/UI/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { push } = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      fullname: e.target.fullname.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
    };

    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      e.target.reset();
      push("/auth/login");
    } else {
      console.log("Failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[350px]">
        <h1 className="text-3xl font-bold font-serif text-center mb-6">
          Register
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input id={"email"} label={"Email"} type={"email"} />
          <Input id={"fullname"} label={"FullName"} type={"text"} />
          <Input id={"phone"} label={"Phone"} type={"text"} />
          <Input id={"password"} label={"Password"} type={"password"} />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
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
