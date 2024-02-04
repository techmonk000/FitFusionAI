import React from "react";
import signup from "../assets/login-im.svg"; // Replace with the actual path to your signup image
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();
  const { login, setAuthToken } = useAuth();

  const host = "https://express-backend-le3i.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          setAuthToken(json.authtoken);
          login();
          navigate("/details");
        } else {
          console.error("Signup failed:", json.message);
        }
      } else {
        console.error("Signup failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300">
      <div className="overflow-hidden p-8 bg-white bg-opacity-30 h-full rounded-xl shadow-lg backdrop-blur-xl backdrop-filter flex">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800 ml-32">
            Signup
          </h1>
          <form
            className="flex flex-col space-y-6 mt-8"
            action="submit"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center space-x-4">
              <label htmlFor="name" className="text-gray-700">
                Username:
              </label>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={onChange}
                value={credentials.name}
                minLength={3}
                required
                className="border border-gray-400 bg-transparent rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-12">
              <label htmlFor="email" className="text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="johndoe@email.com"
                value={credentials.email}
                onChange={onChange}
                className="border border-gray-400 bg-transparent rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="password" className="text-gray-700 mr-1">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*********"
                value={credentials.password}
                onChange={onChange}
                className="border border-gray-400 bg-transparent rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-400 text-white px-6 py-2.5 rounded-md shadow-lg hover:bg-green-600 focus:outline-none"
              style={{ marginTop: "2.3rem" }}
            >
              Signup
            </button>
          </form>
          <p className="mt-8 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="flex-shrink-0 ml-8">
          <img
            src={signup}
            alt="Description of your image"
            className="w-56 h-68 ml-20"
          />
        </div>
      </div>
    </div>
  );
}
