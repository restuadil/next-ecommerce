import Footer from "@/components/Footer/Footer";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full">
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
