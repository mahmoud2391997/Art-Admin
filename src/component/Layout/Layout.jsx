import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar"; // تأكد من المسار الصحيح لاستيراد Sidebar
import "../../App.css";

export default function Layout() {
  const location = useLocation();
  const noLayout = ["/register", "/login", "/notfound"];
  const showLayout = !noLayout.includes(location.pathname);

  return (
    <div className="relative flex min-h-screen lg:w-full sm:w-full md:w-full">
      {showLayout && <Sidebar />}
      <div className="flex-grow p-5">
        <Outlet />
      </div>
    </div>
  );
}
