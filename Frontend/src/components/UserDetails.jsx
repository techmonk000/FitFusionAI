import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit } from "react-icons/fa";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { isLoggedIn, getToken } = useAuth();
  const host = 'http://localhost:5000';

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': `${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300">
      {user ? (
        <>
        <FaEdit />
        <ul>
          <li>Name: {user.name}</li>
          <li>Age: {user.age}</li>
          <li>Gender: {user.gender}</li>
          <li>Diet-Preference: {user.dietPref}</li>
          <li>Height: {user.height}</li>
          <li>Weight: {user.weight}</li>
          <li>Exercise: {user.exercise}</li>
          <li>Disease: {user.disease}</li>
          <li>Allergy: {user.allergy}</li>
        </ul></>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
