import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "@tanstack/react-router";

export const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
