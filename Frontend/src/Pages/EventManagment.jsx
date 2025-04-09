import React, { useState, useEffect } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SearchBar from '../Components/SearchBar';
import { useNavigate } from "react-router-dom";


function EventManagment() {
  const [userId, setUserId] = useState();
  const [events, setEvents] = useState([]);
  const [attendeeCounts, setAttendeeCounts] = useState({});
  const [editEventId, setEditEventId] = useState(null);
  const [editedEventData, setEditedEventData] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); 


  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setUserId(Number(decode.id));
    }

    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedEvents = res.data;
        setEvents(fetchedEvents);

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
      } catch {
        console.log("err");
      }
    };

    fetchEvents();
  }, []);

  // Filter for events created by user and matching search
  const filteredMyEvents = events.filter(
    event =>
      event.userId === userId &&
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete event.");
    }
  };

  const handleEditClick = (event) => {
    setEditEventId(event.id);
    setEditedEventData({ ...event });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEventData((prev) => ({ ...prev, [name]: value }));
  };

  

  const handleSave = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/events/${eventId}`,
        editedEventData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update event list
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, ...editedEventData } : event
        )
      );

      setEditEventId(null);
      setEditedEventData({});
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update event.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Events</h2> 
      <button className="flex items-center gap-2 text-lg font-semibold mb-6 text-white bg-red-500 hover:bg-red-600 transition-colors px-5 py-2 rounded-xl shadow-md" onClick={()=> navigate("../dashboard")}>
          ← Back
      </button>

      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredMyEvents.length === 0 ? (
        <p>No events created by you.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMyEvents.map((event) => {
            const isEditing = event.id === editEventId;
            return (
              <div key={event.id} className="bg-gray-200 p-4 rounded shadow">
                {isEditing ? (
                  <>
                    <input
                      className="w-full mb-2 p-1 border rounded"
                      name="name"
                      value={editedEventData.name}
                      onChange={handleChange}
                    />
                    <textarea
                      className="w-full mb-2 p-1 border rounded"
                      name="description"
                      value={editedEventData.description}
                      onChange={handleChange}
                    />
                    <input
                      className="w-full mb-2 p-1 border rounded"
                      name="location"
                      value={editedEventData.location}
                      onChange={handleChange}
                    />
                    <input
                      className="w-full mb-2 p-1 border rounded"
                      name="date"
                      type="date"
                      value={editedEventData.date.slice(0, 10)}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
                <p className="text-sm text-blue-600 mt-1 font-medium">
                  Attending: <span className="font-semibold">{attendeeCounts[event.id] || 0}</span>
                </p>

                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() =>
                      isEditing ? handleSave(event.id) : handleEditClick(event)
                    }
                    className={`px-4 py-1 ${isEditing ? "bg-blue-600" : "bg-green-700"} text-white rounded hover:opacity-90`}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>

                  {!isEditing && (
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}

                      <button
                        className='px-4 py-1 bg-amber-600 text-white hover:bg-amber-800'
                        onClick={() => navigate("/attendee-managment")}
                      >
                        Manage Attendance
                      </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EventManagment;
