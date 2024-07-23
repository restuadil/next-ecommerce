import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children, title, link, textLink, error, redirect }) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full gap-3"
      style={{
        backgroundImage: "url('/1.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
      }}
    >
      <Image src={"/ssilogo.png"} alt="sad" height={200} width={200} />
      <h1 className="text-[60px] font-bold text-slate-700 font-serif">
        {title}
      </h1>
      {error && <span className="text-red-500">{error}</span>}
      {children}
      <div className="text-center text-lg ">
        {/* {textLink} */}
        <Link href={link}>
          <span className="text-blue-500">{redirect}</span>
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
