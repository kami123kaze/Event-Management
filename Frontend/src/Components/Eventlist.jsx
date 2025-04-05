import React, { useEffect, useState } from "react";
import axios from "axios";


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

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
      } catch (err) {
        setError("Failed to load events");
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

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

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
