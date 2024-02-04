import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Popup = ({ onClose, items }) => {
  return (
    <div className="popup fixed top-25 left-25 rounded-2xl bg-gradient-to-tl from-gray-600 to-teal-600 border-2 h-2/4 w-2/4 overflow-auto">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button className="absolute bottom-3 right-5 z-10" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

const Food = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [cal, setCal] = useState(null);
  const { isLoggedIn, getToken } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [currentMeal, setCurrentMeal] = useState(null);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleButton1Click = (content) => {
    setCurrentMeal("Breakfast");
    openPopup(content, breakfast);
  };
  const handleButton2Click = (content) => {
    setCurrentMeal("Lunch");
    openPopup(content,lunch);
  };
  const handleButton3Click = (content) => {
    setCurrentMeal("Snacks");
    openPopup(content,snacks);
  };
  const handleButton4Click = (content) => {
    setCurrentMeal("Dinner");
    openPopup(content,dinner);
  };
  const host = "https://express-backend-le3i.onrender.com";
  const host2 = "https://cbf8-34-133-34-233.ngrok-free.app";

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect or handle unauthorized access
      console.log("User not logged in. Redirecting...");
      navigate("/login"); // Redirect to login page
      return;
    }
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
        setCal(fooddata[1]);
        const breakfastList = [];
        const lunchList = [];
        const snackList = [];
        const dinnerList = [];

        for (let i = 1; i <= 9; i++) {
          const item = fooddata[2][i];
          const itemStr = item.split(":");
          const itemList = itemStr[1].trim();
          breakfastList.push(itemList);
        }
        for (let i = 11; i <= 17; i++) {
          const item = fooddata[2][i];
          const itemStr = item.split(":");
          const itemList = itemStr[1].trim();
          lunchList.push(itemList);
        }
        for (let i = 19; i <= 24; i++) {
          const item = fooddata[2][i];
          const itemStr = item.split(":");
          const itemList = itemStr[1].trim();
          snackList.push(itemList);
        }
        for (let i = 26; i <= 32; i++) {
          const item = fooddata[2][i];
          const itemStr = item.split(":");
          const itemList = itemStr[1].trim();
          dinnerList.push(itemList);
        }

        setBreakfast(breakfastList);
        setLunch(lunchList);
        setSnacks(snackList);
        setDinner(dinnerList);
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
                onClick={() => handleButton1Click("Breakfast")}
              >
                Breakfast
              </button>
              <button
                className="w-80 h-10 border-2"
                onClick={() => handleButton2Click("Lunch")}
              >
                Lunch
              </button>
              <button
                className="w-80 h-10 border-2"
                onClick={() => handleButton3Click("Snacks")}
              >
                Snacks
              </button>
              <button
                className="w-80 h-10 border-2"
                onClick={() => handleButton4Click("Dinner")}
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
      {popupVisible && <Popup onClose={closePopup} items={currentMeal === "Breakfast" ? breakfast : currentMeal === "Lunch" ? lunch : currentMeal === "Snacks" ? snacks : dinner} />}
    </div>
  );
};

export default Food;
