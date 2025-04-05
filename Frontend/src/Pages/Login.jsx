import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import axios from "axios";


const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("All fields are required.");
    }
    
    try {

        const res = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password,
        });
    
        const data = res.data;
    
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // Redirect on success
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Login failed";
        setError(errorMsg);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/24 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>



        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" variant="primary" type="submit">
            Login
          </Button>
          <p className="text-center text-sm text-gray-300 mt-4">
            Not a user?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
