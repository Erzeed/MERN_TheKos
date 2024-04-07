import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout w-full h-full">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

// function RequireAuth() {
//   const { currentUser } = useContext(AuthContext);

//   if (!currentUser) return <Navigate to="/login" />;
//   else {
//     return (
//       <div className="layout">
//         <div className="navbar">
//           <Navbar />
//         </div>
//         <div className="content">
//           <Outlet />
//         </div>
//       </div>
//     );
//   }
// }

export { Layout };