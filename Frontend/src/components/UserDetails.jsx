import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

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
    <div className="flex  justify-center p-64 h-full bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300">
      {user ? (
        <div>
        <div className='p-4 items-center  rounded-2xl bg-gradient-to-r from-green-700 to-90% inline-block text-transparent  bg-clip-text text-center font-bold w-full h-full leading-loose border-4 border-teal-400  text-green-700 text-3xl  ' >
          <div>Name:            Stuti</div>
        <div className='flex text-center ml-44 items-center'>
        <div>
          <div>Age:             19</div>
          <div>Gender:          female</div>
          <div>Diet-Preference: food</div>
          <div>Height:          150</div></div>
         <div > <div>Weight:          52</div>
          <div>Exercise:        no</div>
          <div>&nbsp;&nbsp;Disease:         no</div>
          <div>Allergy:         no</div></div>
        </div>
        </div>
        </div>
        
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
