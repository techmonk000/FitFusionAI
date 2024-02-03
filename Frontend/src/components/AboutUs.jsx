import React from "react";
import signup from "../assets/login-im.svg";

export default function AboutUs() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300">
      <div className="overflow-hidden p-8 bg-white bg-opacity-30 mt-10 h-full rounded-xl shadow-lg backdrop-blur-xl backdrop-filter flex mx-auto">
        <div className="flex-2 max-w-md mt-29 ml-8">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
            About Us
          </h1>
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <p className="text-gray-700">
                Our AI Trainer is an innovative solution that goes beyond
                traditional fitness guidance. Tailored to assist you throughout
                your fitness journey, it not only provides real-time feedback on
                maintaining the correct posture but also leverages advanced
                algorithms to analyze your movements, ensuring precise tracking
                of your repetitions.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                The Therapist AI is a compassionate companion dedicated to
                supporting your mental well-being. In today's fast-paced world,
                managing stress and maintaining a positive mindset is crucial.
                Our Therapist AI is here to guide you through various
                relaxation techniques, mindfulness exercises, and provide
                personalized strategies to cope with stress and anxiety.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Our Diet Recommendation System revolutionizes the way you
                approach nutrition. Understanding that each individual has
                unique dietary preferences, health conditions, and fitness
                goals, our system creates personalized meal plans tailored
                specifically for you.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-8">
          <img
            src={signup}
            alt="Description of your image"
            className="w-56 h-68"
          />
        </div>
      </div>
    </div>
  );
}

