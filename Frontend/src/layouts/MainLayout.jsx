/** @format */

import { Header, Footer } from "@/components";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Toaster />

      <Footer />
    </>
  );
};

export default MainLayout;
