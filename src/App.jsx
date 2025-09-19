import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function SomeParent() {
  return (
    <div>
      <Navbar />
      <main className="dark:bg-slate-950">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
