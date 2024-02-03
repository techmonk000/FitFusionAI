import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Multiselect from 'multiselect-react-dropdown';

export default function Details() {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    dietPref: 'veg',
    height: '',
    weight: '',
    exercise: '',
    disease: [],
    allergy: [],
  });

  const navigate = useNavigate();
  const { isLoggedIn, getToken } = useAuth();

  const host = 'http://localhost:5000';

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect or handle unauthorized access
      console.log("User not logged in. Redirecting...");
      navigate("/login"); // Redirect to login page
      return;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {  
        console.log(formData);
        const response = await fetch(`${host}/api/auth/updateuser`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': `${getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/therapy");
      } else {
        console.error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleChange = (e, name) => {
    const value = e.target ? e.target.value : e.map(item => item.name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const data = [
    {name: 'Coeliac disease', code: 1},
    {name: 'Hypothyroidism', code: 2},
    {name: 'Hyperthyroidism', code: 3},
    {name: 'Diabetes insipidus', code: 4},
    {name: 'Frozen Shoulder', code: 5},
    {name: 'Trigger Finger', code: 6},
    {name: 'Haemochromatosis', code: 7},
    {name: 'Acute Pancreatitis', code: 8},
    {name: 'Chronic Pancreatitis', code: 9},
    {name: 'Nausea and vomiting', code: 10},
    {name: 'Migraine', code: 11},
    {name: 'Mononucleosis', code: 12},
    {name: 'Stomach aches', code: 13},
    {name: 'Conjunctivitis', code: 14},
    {name: 'Dry Mouth', code: 15},
    {name: 'Acne', code: 16},
    {name: 'Malnutrition', code: 17},
    {name: 'Diabetes', code: 18},
    {name: 'Kidney Infection', code: 19},
    {name: 'Obstructive Sleep Apnea', code: 20},
    {name: 'Thyroid', code: 21},
    {name: 'Scleroderma', code: 22},
    {name: 'Acromegaly', code: 23},
    {name: 'Phoechromocytoma', code: 24},
    {name: 'Lupus', code: 25},
    {name: 'Cushing Syndrome', code: 26},
    {name: 'Hypertension', code: 27},
    {name: 'Type 2 Diabetes', code: 28},
    {name: 'High blood pressure', code: 29},
    {name: 'Heart Disease', code: 30},
    {name: 'Stroke', code: 31},
    {name: 'Sleep apnea', code: 32},
    {name: 'Metabolic syndrome', code: 33},
    {name: 'Fatty liver disease', code: 34},
    {name: 'Osteoarthritis', code: 35},
    {name: 'Gallbladder diseases', code: 36},
    {name: 'Kidney Diseases', code: 37},
    {name: 'Measles', code: 38},
    {name: 'Mouth Ulcer', code: 39},
    {name: 'Sore Throat', code: 40},
    {name: 'Yellow Fever', code: 41}
  ]
  const [options] = useState(data);


  const data2=[
    {name: 'Milk', code: 1},
    {name: 'Eggs', code: 2},
    {name: 'Peanuts', code: 3},
    {name: 'Tree nuts', code: 4},
    {name: 'Sesame', code: 5},
    {name: 'Soy', code: 6},
    {name: 'Fish', code: 7},
    {name: 'Shellfish', code: 8},
    {name: 'Wheat', code: 9},
    {name: 'Triticale', code: 10},
    {name: 'Celery', code: 11},
    {name: 'Carrot', code: 12},
    {name: 'Avocado', code: 13},
    {name: 'Bell pepper', code: 14},
    {name: 'Potato', code: 15},
    {name: 'Pumpkin', code: 16},
    {name: 'Mushroom', code: 17},
    {name: 'Onion', code: 18},
    {name: 'Mustard', code: 19},
    {name: 'Spices', code: 20},
  ]
  const [options2] = useState(data2);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300">
      <div className="py-8 px-2 lg:px-8 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg backdrop-filter w-3/4">
        <h1 className="text-5xl font-bold  outline-4 text-center  text-shadow mt-5 bg-gradient-to-r from-green-400 to-blue-500  text-transparent  bg-clip-text mb-5">Diet Recommender</h1>
        <form className="flex flex-col"  onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="gender">Gender</label>
              <select className="bg-transparent border rounded-lg  shadow-md shadow-green-600 border-gray-300 text-green-950 focus:border-green-500 focus:ring-2 focus:ring-green-200 py-2 px-4 block w-full appearance-none hover:shadow-lg hover:shadow-green-800 mt-2  leading-normal" id="gender" name="gender" onChange={(e) => handleChange(e, 'gender')} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="age">Age</label>
              <input className="bg-transparent border rounded-lg  shadow-md shadow-green-600 border-gray-300 text-green-950 focus:border-green-500 focus:ring-2 focus:ring-green-200 py-2 px-4 block w-full appearance-none hover:shadow-lg hover:shadow-green-800 mt-2  leading-normal" type="number" id="age" name="age" onChange={(e) => handleChange(e, 'age')} required />
            </div>
            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="dietPref">Diet Preference</label>
              <select className="bg-transparent border rounded-lg shadow-md shadow-green-600 border-gray-300 text-green-950 focus:border-greengreen-500 focus:ring-2 focus:ring-green-200 py-2 px-4 block w-full appearance-none hover:shadow-lg hover:shadow-green-800 mt-2  leading-normal" id="dietPref" name="dietPref" onChange={(e) => handleChange(e, 'dietPref')} required>
                <option value="veg">Vegetarian</option>
                <option value="nonveg">Non-Vegetarian</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="height">Height (in cm)</label>
              <input className="bg-transparent border rounded-lg  shadow-md shadow-green-600 border-gray-300 text-green-950 focus:border-green-500 focus:ring-2 focus:ring-green-200 py-2 px-4 block w-full appearance-none hover:shadow-lg hover:shadow-green-800 mt-2  leading-normal" type="number" id="height" name="height" onChange={(e) => handleChange(e, 'height')} required />
            </div>
            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="weight">Weight (in kg)</label>
              <input className="bg-transparent border rounded-lg  shadow-md shadow-green-600 border-gray-300 text-green-950 focus:border-green-500 focus:ring-2 focus:ring-green-200 py-2 px-4 block w-full appearance-none hover:shadow-lg hover:shadow-green-800 mt-2  leading-normal" type="number" id="weight" name="weight" onChange={(e) => handleChange(e, 'weight')} required />
            </div>
            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="exercise">Amount of Exercise Daily (in minutes)</label>
              <select className="bg-transparent border rounded-lg shadow-md shadow-green-600 border-gray-300 text-green-950 focus:border-greengreen-500 focus:ring-2 focus:ring-green-200 py-2 px-4 block w-full appearance-none hover:shadow-lg hover:shadow-green-800 mt-2  leading-normal" id="exercise" name="exercise" onChange={(e) => handleChange(e, 'exercise')} required>
              <option value={1}>
              1. Sedentary (little or no exercise)</option>
              <option value={2}>2. Lightly active (light exercise/sports 1-3 days/week)</option>
              <option value={3}>3. Moderately active (moderate exercise/sports 3-5 days/week)</option>
              <option value={4}>4. Very active (hard exercise/sports 6-7 days/week)</option>
              <option value={5}>5. Extra active (very hard exercise/sports or physical job)</option>
            </select>
            </div>
            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="disease">Persisting diseases</label>
              
              <Multiselect
              onSelect={(selectedList) => handleChange(selectedList, "disease")}
              onRemove={(selectedList) => handleChange(selectedList, "disease")}
              options={options}
              displayValue="name"
              placeholder="Select diseases"
              style={{
                    chips: {
                    background: 'green'
                    },
                    multiselectContainer: {
                    color: 'green'
                    },
                    searchBox: {
                    border: 'none',
                    'border-bottom': '3px solid green',
                    'border-radius': '9px'
                    }
                    }}
                    />

            </div>

            <div className="mb-5">
              <label className="text-gray-700 font-semibold mb-2" htmlFor="allergy">Allergies</label>             
              <Multiselect
              onSelect={(selectedList) => handleChange(selectedList, "allergy")}
              onRemove={(selectedList) => handleChange(selectedList, "allergy")}
              options={options2}
              displayValue="name"
              placeholder="Select allergens"
              style={{
                    chips: {
                    background: 'green'
                    },
                    multiselectContainer: {
                    color: 'green'
                    },
                    searchBox: {
                    border: 'none',
                    'border-bottom': '3px solid green',
                    'border-radius': '9px'
                    }
                    }}
              />
            </div>
          </div>
          <button className=" mt-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-cyan-200 hover:to-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out mb-5" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
