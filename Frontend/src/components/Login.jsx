import { useState } from "react";
import login_img from "../assets/login-im.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, setAuthToken } = useAuth()
  const [seePassword, setSeePassword] = useState(false);

  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setAuthToken(json.authtoken);
      login();
      navigate("/food");
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
            Login
          </h1>
          <form
            className="flex flex-col space-y-6 mt-8"
            onSubmit={handleSubmit}
            action="submit"
          >
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
              Login
            </button>
          </form>
          <p className="mt-8 text-gray-700">
            New user?{" "}
            <Link to="/signup" className="text-green-700 hover:underline">
              SignUp
            </Link>
          </p>
        </div>
        <div className="flex-shrink-0 ml-8">
          <img
            src={login_img}
            alt="Description of your image"
            className="w-56 h-68 ml-20"
          />
        </div>
      </div>
    </div>
  );
}
