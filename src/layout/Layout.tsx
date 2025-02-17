import React from "react";
import Header from "../components/Header";
import { LayoutProps } from "../utils/types";


const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
        <Header />
        {children}
      </>
  );
};

export default Layout;
