import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [attendeeCounts, setAttendeeCounts] = useState({});

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(Number(decoded.id)); // userId from the token
    }
  
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedEvents = res.data;
        setEvents(fetchedEvents);
  
        // Fetch attendee counts for each event
        const counts = {};
        for (const event of fetchedEvents) {
          try {
            const res = await axios.get(`http://localhost:5000/api/events/${event.id}/attending-count`);
            counts[event.id] = res.data.count;
          } catch (err) {
            console.error(`Error fetching count for event ${event.id}`, err);
            counts[event.id] = 0;
          }
        }
        setAttendeeCounts(counts); 
  
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
  const handleRSVP = async (eventId, change) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/events/${eventId}/rsvp`, 
        { change }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refetch count after change
      const res = await axios.get(`http://localhost:5000/api/events/${eventId}/attending-count`);
      setAttendeeCounts(prev => ({ ...prev, [eventId]: res.data.count }));
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message;
        if (message === "Invalid RSVP state") {
          alert("You are already attending this event.");
        } else {
          alert(`RSVP failed: ${message}`);
        }
      } else {
        alert("Network error while trying to RSVP.");
        console.error("RSVP failed", err);
      }
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => {

            return (
              <div key={event.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Date: {new Date(event.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {/* 🧍 Attending Count */}
                  <p className="text-sm text-blue-600 mt-1 font-medium">
                    Attending: <span className="font-semibold">{attendeeCounts[event.id] || 0}</span>
                  </p>

                {/* Only show delete button if current user is the creator */}
                {event.userId === userId && (
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}

                {/* Only show RSVP if current user is NOT the creator */}
                  {event.userId !== userId && (
                    <div className="mt-2 flex gap-2 items-center">
                      <button
                        onClick={() => handleRSVP(event.id, 1)}
                        title="Attending this event?"
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleRSVP(event.id, -1)}
                        title="Cancel RSVP?"
                        className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        👎
                      </button>
                    </div>
)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventList;
