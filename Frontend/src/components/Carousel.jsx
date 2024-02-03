import Slider from 'react-slick';
import posture from "../assets/greenpos.jpg"
import mental from "../assets/brain.jpg"
import fit from "../assets/fit.jpg"
import food from "../assets/food.jpg"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="slick-arrow-custom text-4xl ml-2 text-green-900 slick-next-custom"
  >
   <FaArrowAltCircleRight />
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="slick-arrow-custom slick-prev-custom text-4xl mr-2 text-green-900 slick-next-custom"
  >
     <FaArrowAltCircleLeft />
  </button>
);
export default function ImageCarousel() {
  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000, // Set the interval for automatic sliding (in milliseconds)
    nextArrow: <CustomNextArrow />,  // Custom arrow components
    prevArrow: <CustomPrevArrow />,};


  return (
    <Slider {...settings} className="  w-5/6 py-12  flex items-center   ">
    <div className='h-auto  mt-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-3xl'>
      <div className=" shadow-inner  shadow-bl  m-1 backdrop-blur-sm bg-opacity-10  flex items-center bg-gradient-to-bl from-green-300 via-gray-200 to-teal-200   rounded-3xl text-xl   justify-evenly "> 
      <img src={posture} alt="" className='w-64  h-64 rounded-3xl m-5    shadow-2xl shadow-green-800 ' />
      <p className='bg-gradient-to-r from-blue-700 via-green-500 to-indigo-950 inline-block text-transparent bg-clip-text  backdrop-filter  space-x-10 m-10 text-3xl  font-sans   text-center  p-2  rounded-r-full  h-48 ' >
      Elevate your posture with real-time feedback, smart sensors, and customizable settings. Our intuitive app, alerts, and guided training programs make improvement easy.
      </p>
      </div>
      </div>
      <div className='h-auto mr-2 mt-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-3xl'>
      <div className="shadow-inner  shadow-bl m-1 backdrop-blur-sm bg-opacity-10  flex items-center bg-gradient-to-bl from-green-300 via-gray-200 to-teal-200   rounded-3xl text-xl   justify-evenly"> 
      <img src={food} alt="" className='w-64  h-64 rounded-3xl m-5    shadow-2xl shadow-green-800  ' />
      <p className='bg-gradient-to-r from-blue-700 via-green-500 to-indigo-950 inline-block text-transparent bg-clip-text  backdrop-filter  space-x-10 m-10 text-3xl  font-sans   text-center  p-2  rounded-r-full  h-48 '>
      Customize your nutrition effortlessly with tailored meal plans and nutrient tracking. Personalize calories, and track progress with ease. Stay hydrated with water reminders for a holistic health approach.
      </p>
      </div>
      </div>
      <div className='h-auto mr-2 mt-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-3xl'>
      <div className="shadow-inner shadow-bl m-1 backdrop-blur-sm bg-opacity-10  flex items-center bg-gradient-to-bl from-green-300 via-gray-200 to-teal-200   rounded-3xl text-xl   justify-evenly">
      <img src={mental} alt="" className='w-64  h-64 rounded-3xl m-5    shadow-2xl shadow-green-800  ' />
      <p className='bg-gradient-to-r from-blue-700 via-green-500 to-indigo-950 inline-block text-transparent bg-clip-text  backdrop-filter  space-x-10 m-10 text-3xl  font-sans   text-center  p-2  rounded-r-full  h-48 '>Prioritize mental well-being with personalized resources, mindfulness exercises, and thought journals. Gain insights through progress reports and access crisis support for a holistic mental health approach.</p>
      </div>
      </div>
      <div className='h-auto mr-2 mt-2  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-3xl'>
      <div className="shadow-inner  shadow-bl m-1 backdrop-blur-sm bg-opacity-10  flex items-center bg-gradient-to-bl from-green-300 via-gray-200 to-teal-200  rounded-3xl text-xl   justify-evenly">
        <img src={fit} alt="" className='w-64  h-64 rounded-3xl m-5    shadow-2xl shadow-green-800 ' />
      <p className='bg-gradient-to-r from-blue-700 via-green-500 to-indigo-950 inline-block text-transparent bg-clip-text  backdrop-filter  space-x-10 m-10 text-3xl  font-sans   text-center  p-2    h-48'>Optimize your fitness journey with personalized workouts, progress tracking, diverse exercises, reminders, and intensity adjustments. Achieve your goals with ease and enjoyment.</p>
      </div>
      </div>
      
      
      
      
    </Slider>
  );
}
