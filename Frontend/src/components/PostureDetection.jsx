import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function PostureDetection() {
  const navigate = useNavigate();
  const { isLoggedIn } =useAuth();
  const videoRef = useRef();
  const [initialAngles, setInitialAngles] = useState({ left: 90, right: 90 });
  const [currentAngles, setCurrentAngles] = useState({ left: 0, right: 0 });
  const [repCounter, setRepCounter] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const intervalIdRef = useRef(); // Ref to hold the intervalId
  const streamRef = useRef(); // Ref to hold the stream

  const handleCapturingToggle = () => {
    setIsCapturing((prevIsCapturing) => !prevIsCapturing);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect or handle unauthorized access
      console.log("User not logged in. Redirecting...");
      navigate("/login"); // Redirect to login page
      return;
    }
    const fetchData = async () => {
      try {
        if (isCapturing) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });

          videoRef.current.srcObject = stream;
          streamRef.current = stream;

          videoRef.current.onloadedmetadata = () => {
            intervalIdRef.current = setInterval(async () => {
              if (videoRef.current.srcObject) {
                const canvas = document.createElement("canvas");
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                const context = canvas.getContext("2d");
                context.drawImage(
                  videoRef.current,
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );
                const imageData = canvas.toDataURL("image/jpeg");

                const response = await axios.post(
                  "https://cbf8-34-133-34-233.ngrok-free.app/video_frame",
                  { frame: imageData }
                );

                console.log("Server Response:", response.data);

                const { left, right } = response.data;

                setCurrentAngles({ left, right });

                // Check final angle condition and update rep counter
                if (
                  (initialAngles.left >= 85 &&
                  initialAngles.left <= 100 && left < 60 ) ||
                  (initialAngles.right >= 85 &&
                  initialAngles.right <= 100 &&
                  right < 60)||(initialAngles.left >= 85 &&
                    initialAngles.left <= 100 && left < 60 &&
                    initialAngles.right >= 85 &&
                    initialAngles.right <= 100 &&
                    right < 60)
                ) {
                  setRepCounter((prevCounter) => prevCounter + 1);
                }
              }
            }, 5000);
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    fetchData();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCapturing, initialAngles]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-green-400 via-gray-50 to-teal-300 p-8">
      <div className="relative overflow-hidden p-8 bg-white bg-opacity-30 h-full rounded-xl shadow-lg backdrop-blur-xl backdrop-filter flex">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800 ml-32">
            Posture Detection
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <video
                id="video"
                width="640"
                height="480"
                ref={videoRef}
                autoPlay
                className="rounded-md shadow-lg"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex-1 p-4 text-red animate__animated animate__fadeInUp">
              <p style={{ color: "red" }}>
                Initial Left Arm Angle 'expected 90 degrees':{" "}
                {currentAngles.left} degrees
              </p>
              <p style={{ color: "red" }}>
                Initial Right Arm Angle 'expected 90 degrees':{" "}
                {currentAngles.right} degrees
              </p>
              <p className="text-green-500">Number of Reps: {repCounter}</p>
              {/* Move the button inside this div */}
              <div className="mt-4">
                <button
                  onClick={handleCapturingToggle}
                  className={`${
                    isCapturing ? "bg-red-500" : "bg-green-500"
                  } text-white py-2 px-4 rounded-full transition duration-300 ease-in-out ${
                    isCapturing
                      ? "hover:bg-red-600 hover:shadow-md"
                      : "hover:bg-green-600 hover:shadow-md"
                  }`}
                >
                  {isCapturing ? "Stop Capturing" : "Start Capturing"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
