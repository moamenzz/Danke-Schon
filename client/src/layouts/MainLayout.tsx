import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="max-w-[85rem] mx-auto mt-3">
        <Navbar />
      </div>

      {/* Main Page */}
      <div className="max-w-[85rem] mx-auto">
        <Outlet />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
