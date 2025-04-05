import React from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../Components/Eventlist";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Correct


const Dashboard = () => {
  const navigate = useNavigate();
  const [weeklyCount, setWeeklyCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);
  

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        // Decode token to get user ID
        const decoded = jwtDecode(token);
        const userId = decoded.id; // or decoded.userId based on your payload
  
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUsername(res.data.name);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
  
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setEvents(res.data);
        setWeeklyCount(res.data.length); // Just count all events
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
  
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     <header className="flex justify-between items-center mb-4">
  <div className="flex items-center space-x-3">
    <img
      src="https://i.pravatar.cc/40" // Dummy profile picture
      alt="Profile"
      className="w-10 h-10 rounded-full border border-gray-300"
    />
    <div>
      <p className="text-sm text-gray-600">Logged in as</p>
      <p className="text-base font-medium text-gray-800">{username || "Loading..."}</p>
    </div>
  </div>

  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
  >
    Logout
  </button>
</header>


      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
          <p className="text-gray-600">
            You have {weeklyCount} event{weeklyCount !== 1 ? "s" : ""}.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Actions</h2>
          <ul className="list-disc list-inside text-gray-600">
        <li onClick={() => navigate("/create-event")} 
        className="cursor-pointer text-blue-600 hover:underline hover:text-blue-800 transition-all"
            >Create New Event
        </li>
          <li>Manage Attendees</li>
            <li>View Reports</li>
          </ul>
        </div>
      </section>
       {/* Event List */}
       <EventList />
    </div>
  );
};

export default Dashboard;
