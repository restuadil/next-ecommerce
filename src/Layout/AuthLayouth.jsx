import Link from "next/link";
import React from "react";

const AuthLayouth = ({ children, title, link, textLink, error, redirect }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h1 className="text-3xl font-bold font-serif text-center mb-6">
          {title}
        </h1>
        {error && <span className="text-red-500">{error}</span>}
        {children}
        <h3 className="text-center text-lg mt-3">
          {textLink}
          <Link href={link}>
            <span className="text-blue-500">{redirect}</span>
          </Link>
        </h3>
      </div>
    </>
  );
};

export default AuthLayouth;
