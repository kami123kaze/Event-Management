import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./Pages/Dashboard";
import CreateEvent from "./pages/CreateEvents";
import EventManagment from "./pages/EventManagment";
import AttendeeManagment from "./pages/AttendeeManagment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event-managment" element={<EventManagment />} />
        <Route path="/attendee-managment" element={<AttendeeManagment />} />

      </Routes>
    </Router>
  );
}

export default App;
