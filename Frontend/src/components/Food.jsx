import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Popup = ({ onClose, items }) => {
  return (
    <div className="popup fixed top-25 left-25 rounded-2xl bg-gradient-to-tl from-gray-600 to-teal-600 border-2 h-2/4 w-2/4 overflow-auto">
      <ul>
        {items}
      </ul>
      <button className="absolute bottom-3 right-5 z-10" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

const Food = () => {
  const [user, setUser] = useState(null);
  const [food, setFood] = useState([]);
  const [cal, setCal] = useState(null);
  const { isLoggedIn, getToken } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleButtonClick = (content) => {
      openPopup(content);
  };
  const host = "http://localhost:5000";
  const host2 = "http://localhost:8000";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user details
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

        // Fetch food data
        const res = await fetch(
          `${host2}/check/70.5/175.0/25/male/3/Vegetarian/Diabetes,Hypertension/Peanuts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to get user details");
        }

        const fooddata = await res.json();
        console.log(fooddata);
        setCal(fooddata[1])
        var s = fooddata[2][1];
        let trimmedString = s.split(":");
        let grainsList = trimmedString[1].trim();
        setFood(grainsList);

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
          <div className="flex flex-row w-full gap-8 justify-around">
            <div className="flex flex-col">
              <div>Your daily Calorie requirements is {cal}</div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="w-80 h-10 border-2"
                onClick={() => handleButtonClick("Breakfast")}
              >
                Breakfast
              </button>
              <button
                className="w-80 h-10 border-2"
                onClick={() => handleButtonClick("Lunch")}
              >
                Lunch
              </button>
              <button
                className="w-80 h-10 border-2"
                onClick={() => handleButtonClick("Dinner")}
              >
                Dinner
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
      {/* Conditionally render the Popup component */}
      {popupVisible && <Popup onClose={closePopup} items={food} />}
    </div>
  );
};

export default Food;
