import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Therapy from "./components/Therapy";
import Details from "./components/Details";
import UserDetails from "./components/UserDetails";
import PostureDetection from "./components/PostureDetection";
import Food from "./components/Food";
import AboutUs from "./components/AboutUs";


// Create a separate component for rendering the main content
const MainContent = () => {
  const location = useLocation();
  const isSignupOrLogin =
    location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/details" ;

  return (
    <>
      {!isSignupOrLogin && <Header />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/therapy" element={<Therapy />} />
        <Route exact path="/details" element={<Details />} />
        <Route exact path="/userdetails" element={<UserDetails />} />
        <Route exact path="/posedetector" element={<PostureDetection />} />
        <Route exact path="/food" element={<Food />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
      </Routes>
      {!isSignupOrLogin && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;
