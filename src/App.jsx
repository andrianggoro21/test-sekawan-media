// import { Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import Login from "./pages/login/login";
// import Dashboard from "./pages/dashboard/dashboard";

// function App() {
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   const handleLogin = (user) => {
//     setLoggedInUser(user);
//   };
//   return (
//     <>
//       <Routes>
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/dashboard/*" element={<Dashboard user={loggedInUser} />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedInUser ? (
            <Navigate to="/dashboard/overview" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/dashboard/*"
        element={
          loggedInUser ? (
            <Dashboard user={loggedInUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
