import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import TicketForm from "./pages/create-tickets/createTickets";

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
      <Route path="/ticket-form" element={<TicketForm />} />
    </Routes>
  );
}

export default App;
