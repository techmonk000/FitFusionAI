import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { isLoggedIn, getToken } = useAuth();
  const host = "https://express-backend-le3i.onrender.com";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: `${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="flex items-center justify-center h-dvh bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300">
      <div className=" p-8 bg-white bg-opacity-30 h-3/4 w-3/4 rounded-xl shadow-lg backdrop-blur-xl backdrop-filter flex">
        {user ? (
          <div className="w-full border-2 ">
            <div className="text-6xl  pb-12">Name: Stuti</div>
            <div className="flex text-2xl flex-col justify-evenly w-full border-2">
              <div className="flex flex-row gap-48 text-2xl">
                <div>Age:19</div>
                <div>Gender:female</div>
              </div>
              <div className="flex flex-row text-2xl gap-48">
                <div>Diet-Preference: food</div>
                <div>Height:150</div>
              </div>
              <div className="flex flex-row text-2xl gap-48">
                <div>Weight:52</div>
                <div>Exercise:no</div>
              </div>
              <div className="flex flex-row text-2xl gap-48">
                <div>Disease:no</div>
                <div>Allergy:no</div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
