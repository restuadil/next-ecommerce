import Link from "next/link";

const AuthLayout = ({ children, title, link, textLink, error, redirect }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-3">
      <h1 className="text-[60px] font-bold font-serif">{title}</h1>
      {error && <span className="text-red-500">{error}</span>}
      {children}
      <div className="text-center text-lg ">
        {textLink}
        <Link href={link}>
          <span className="text-blue-500">{redirect}</span>
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
