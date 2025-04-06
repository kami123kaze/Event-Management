import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateEvent = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token"); 

  
      await axios.post("http://localhost:5000/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Event created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      
      setError(err.response?.data?.error || "Event creation failed.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}

      </form>
    </div>
  );
};

export default CreateEvent;
