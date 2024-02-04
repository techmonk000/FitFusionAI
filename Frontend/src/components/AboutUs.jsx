import React from "react";
import about from "../assets/about.png";
import pos from "../assets/med2.png";
import mind from "../assets/mental.png";

export default function AboutUs() {
  return (
    
      <div className="overflow-hidden p-8 bg-green-700 bg-opacity-30 h-full shadow-2xl shadow-black rounded-xl  backdrop-blur-xl backdrop-filter flex mx-auto space-x-8"> {/* Updated space-x-8 */}
        
      <div className="flex-2 max-w-5xl">
          
          <div className="flex flex-col space-y-8">
            <div className="flex flex-row gap-5 items-center">
              <p className="text-gray-700 text-xl text-left font-semibold">
              Our innovative<strong> AI Trainer</strong> goes beyond traditional fitness guidance. Tailored for your fitness journey, it provides<i> real-time feedback</i> on posture and uses <i>advanced algorithms</i> for precise movement analysis, ensuring accurate repetition tracking. 🏋️‍♂️🔄
              </p>
              <div className="flex-shrink-0">
              <img
                src={pos}
                alt="Description of your image"
                className="w-52 h-52 shadow-lg shadow-black rounded-lg"
              />
            </div>
            </div>
            <div className="flex flex-row gap-5 items-center">
            <div className="flex-shrink-0 ">
              <img
                src={mind}
                alt="Description of your image"
                className="w-52 h-52 shadow-lg shadow-black rounded-lg"
              />
            </div>
              <p className="text-gray-700 text-right text-xl font-semibold">
              Our <strong>Therapist AI</strong> is your compassionate companion for <i>mental well-being</i>. In our fast-paced world, it guides you through relaxation techniques, mindfulness exercises, and offers <i>personalized strategies</i> for stress and anxiety. 🧘‍♀️💆‍♂️
              </p>
              
            </div>
            <div className="flex flex-row gap-5 items-center">
              <p className="text-gray-700 text-left text-xl font-semibold">
              Our <strong>Diet Recommendation System </strong>transforms your approach to <i>nutrition</i>. Recognizing unique preferences, health conditions, and fitness goals, it crafts <i>personalized meal</i> plans just for you. 🥗🍏
              </p>
              <div className="flex-shrink-0 ">
              <img
                src={about}
                alt="Description of your image"
                className="w-52 h-52 shadow-lg shadow-black rounded-lg"
              />
            </div>
            </div>
            
          </div>
        </div>

      </div>
  );
}
