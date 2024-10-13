
// const login = (userId, email, role, branch) => {
//   localStorage.setItem("user", JSON.stringify({ userId, email, role, branch }));
//   if (role === "superadmin") {
//     window.location.href = "localhost:3000/stock";
//   }
  
// };

// const getUserDetails = () => {
//   return localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails")) || {};
// };

// const isLoggedIn = () => {
//   return localStorage.getItem("userDetails") || false;
// }
// const logout = () => {
//   localStorage.removeItem("userDetails");
// };

// export { login, getUserDetails, isLoggedIn, logout };
import { useNavigate } from "react-router-dom";

const login = (userId, email, role, branch) => {
  // Save user details into localStorage using a consistent key "userDetails" 
  localStorage.setItem("userDetails", JSON.stringify({ userId, email, role, branch }));

  // Navigate using React Router's useNavigate hook instead of window.location for consistency
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  if (role === "superadmin") {
    navigate('/stock');
  } else if (role === "admin") {
    navigate('/admin');
  } else if (role === "user") {
    navigate('/user');
  } else {
    // Handle other roles or default case here, perhaps navigating to a common area or showing an error
    navigate('/common');
  }
};

const getUserDetails = () => {
  // Always use the same key that you set earlier to retrieve user details
  return localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : {};
};

const isLoggedIn = () => {
  // Check for the presence of the userDetails item, and potentially check for valid token here if applicable
  return !!localStorage.getItem("userDetails");
};

const logout = () => {
  // Remove the "userDetails" from localStorage to log the user out
  localStorage.removeItem("userDetails");

  // Additional actions when logging out, such as redirecting to login page could be included here
  // const navigate = useNavigate();
  // navigate('/login');
};

export { login, getUserDetails, isLoggedIn, logout };