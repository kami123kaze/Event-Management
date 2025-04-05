import React from "react";
import Button from "../Components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center text-white max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">Event Management System</h1>
        <p className="text-base mb-6 text-gray-300">
          Effortlessly manage and organize your events with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/login")}
            variant="primary"
          >
            Login
          </Button>
          <Button
            className="border-white text-white hover:bg-white hover:text-black"
            onClick={() => navigate("/signup")}
            variant="outline"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
