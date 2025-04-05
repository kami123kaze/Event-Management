import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    setUserId(Number(decoded.id))  }
    
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(res.data);
      } catch (err) {
        setError("Failed to load events");
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update UI
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete event.");
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-400 mt-2">
              Date: {new Date(event.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          
            {/* Only show delete button if current user is the creator */}
            {(event.user?.id ?? event.user) === userId && (
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
              )}
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
