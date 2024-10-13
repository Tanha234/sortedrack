// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import SidebarContextProvider from "../../contexts/SidebarContext";
// import { isLoggedIn, getUserDetails } from "../../service";
// import { Footer, Header, Sidebar } from "../../component";

// const Layout = () => {
//   const location = useLocation();
//   const { role } = getUserDetails();
//   return isLoggedIn() ? (
//     role === "superadmin" ? (
//       <SidebarContextProvider>
//         <main className="d-flex flex-nowrap">
//           <Sidebar />
//           <div className="w-100 overflow-auto main-wrapper min-vh-100 d-flex flex-column">
//             <Header />
//             <section style={{ minHeight: "85vh" }}>
//               <Outlet />
//             </section>
//             <Footer />
//           </div>
//         </main>
//       </SidebarContextProvider>
//     ) : (
//       <Navigate to="/login" state={{ from: location }} replace />
//     )
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default Layout;

// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import SidebarContextProvider from "../../contexts/SidebarContext";
// import { isLoggedIn, getUserDetails } from "../../service";
// import { Footer, Header, Sidebar } from "../../component";

// const Layout = () => {
//   const location = useLocation();
//   const userDetails = getUserDetails();
//   const isLoggedInUser = isLoggedIn();

//   // Logic to render the main layout
//   const renderMainLayout = (role) => {
//     // Configure your role-based render logic here if needed.
//     // Assume that 'user' role is permitted access to the main layout.
//     return ['superadmin', 'admin', 'user'].includes(role) ? (  // Add all the roles you wish to include here.
//       <SidebarContextProvider>
//         <main className="d-flex flex-nowrap">
//           <Sidebar />
//           <div className="w-100 overflow-auto main-wrapper min-vh-100 d-flex flex-column">
//             <Header />
//             <section style={{ minHeight: "85vh" }}>
//               <Outlet />
//             </section>
//             <Footer />
//           </div>
//         </main>
//       </SidebarContextProvider>
//     ) : (
//       // Redirect non-superadmin users to a common area
//       <Navigate to="/common" state={{ from: location }} replace />
//     );
//   };

//   // Main rendering logic
//   return isLoggedInUser ? (
//     renderMainLayout(userDetails.role)
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default Layout;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import SidebarContextProvider from "../../contexts/SidebarContext";
import { isLoggedIn, getUserDetails } from "../../service";
import { Footer, Header, Sidebar } from "../../component";

const Layout = () => {
  const location = useLocation();
  const userDetails = getUserDetails();
  const isLoggedInUser = isLoggedIn();

  // Logic to render the main layout
  const renderMainLayout = (role) => {
    // Check if role is either superadmin, admin, or user
    return ['superadmin', 'admin', 'user'].includes(role) ? (
      <SidebarContextProvider>
        <main className="d-flex flex-nowrap">
          <Sidebar role={role} /> {/* Pass role to Sidebar for conditional rendering */}
          <div className="w-100 overflow-auto main-wrapper min-vh-100 d-flex flex-column">
            <Header />
            <section style={{ minHeight: "85vh" }}>
              <Outlet />
            </section>
            <Footer />
          </div>
        </main>
      </SidebarContextProvider>
    ) : (
      // Redirect non-authorized users to the common area
      <Navigate to="/common" state={{ from: location }} replace />
    );
  };

  // Main rendering logic
  return isLoggedInUser ? (
    renderMainLayout(userDetails.role)
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Layout;
