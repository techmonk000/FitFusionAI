// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Team.css";
import swarnavo from "../assets/teamMember1.jpg";
import mrinmoy from "../assets/teamMember2.jpg";
import stuti from "../assets/teamMember3.jpg";
import raj from "../assets/teamMember4.jpg";
import { FiAward } from "react-icons/fi";

function Team() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h1>
      <div className="flex gap-2">
        <div className="card w-60 h-80 m-4 flex items-center content-center gap-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-400 to-teal-400 shadow-2xl shadow-green-950 backdrop-blur-lg backdrop-filter">
          <div className="w-52 h-32 mt-4 rounded-tr-[72px] border-2 border-green-800 rounded-lg">
            <img
              src={swarnavo}
              alt="Team Member 1"
              className="w-full h-full rounded-tr-[72px] object-cover opacity-100"
            />
          </div>
          <div className="w-52 h-6 border-2 border-green-800 rounded-md flex items-center justify-center">
            <p className="text-l font-semibold text-green-800">
              Swarnavo Mukherjee
            </p>
          </div>
          <div className=" h-20 w-48">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center' , color: 'darkgreen'}}>
              <FiAward style={{ marginRight: '8px' }} /> AI/ML Developer
            </li>
            <li style={{ display: 'flex', alignItems: 'center' , color: 'darkgreen' }}>
              <FiAward style={{ marginRight: '8px' }} /> Cyber Security
            </li>
            <li style={{ display: 'flex', alignItems: 'center' , color: 'darkgreen'}}>
              <FiAward style={{ marginRight: '8px' }} /> Frontend Developer
            </li>
          </ul>
        </div>
        </div>
z
        <div className="card w-60 h-80 m-4 flex items-center content-center gap-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-800 to-teal-800 shadow-2xl shadow-green-950 backdrop-blur-lg backdrop-filter">
          <div className="w-52 h-32 mt-4 rounded-tr-[72px] border-2 border-green-400 rounded-lg">
            <img
              src={mrinmoy}
              alt="Team Member 2"
              className="w-full h-full rounded-tr-[72px] object-cover opacity-100"
            />
          </div>
          <div className="w-52 h-6 border-2 border-green-400 rounded-md  flex items-center justify-center">
            <p className="text-l font-semibold text-green-400">Mrinmay Das</p>
          </div>
          <div className=" h-20 w-48">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <FiAward style={{ marginRight: '8px' }} /> Frontend Developer
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <FiAward style={{ marginRight: '8px' }} /> AI/ML Developer
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <FiAward style={{ marginRight: '8px' }} /> Android app Developer
            </li>
          </ul>
        </div>
        </div>

        <div className="card w-60 h-80 m-4 flex items-center content-center gap-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-400 to-teal-400 shadow-2xl shadow-green-950 backdrop-blur-lg backdrop-filter">
          <div className="w-52 h-32 mt-4 rounded-tr-[72px] border-2 border-green-800 rounded-lg">
            <img
              src={stuti}
              alt="Team Member 3"
              className="w-full h-full rounded-tr-[72px] object-cover opacity-100"
            />
          </div>
          <div className="w-52 h-6 border-2 border-green-800 rounded-md  flex items-center justify-center">
            <p className="text-l font-semibold text-green-800">
              Stuti Sinha
            </p>
          </div>
          <div className=" h-20 w-48">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', color: 'darkgreen' }}>
              <FiAward style={{ marginRight: '8px' }} /> Frontend Developer
            </li>
            <li style={{ display: 'flex', alignItems: 'center', color: 'darkgreen' }}>
              <FiAward style={{ marginRight: '8px' }} /> UI/UX Designer
            </li>
            <li style={{ display: 'flex', alignItems: 'center', color: 'darkgreen' }}>
              <FiAward style={{ marginRight: '8px' }} /> Graphics Designer
            </li>
          </ul>
        </div>
        </div>

        <div className="card w-60 h-80 m-4 flex items-center content-center gap-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-800 to-teal-800 shadow-2xl shadow-green-950 backdrop-blur-lg backdrop-filter">
          <div className="w-52 h-32 mt-4 rounded-tr-[72px] border-2 border-green-400 rounded-lg">
            <img
              src={raj}
              alt="Team Member 4"
              className="w-full h-full rounded-tr-[72px] object-cover opacity-100"
            />
          </div>
          <div className="w-52 h-6 border-2 border-green-400 rounded-md flex items-center justify-center">
            <p className="text-l font-semibold text-green-400">
              Raj Bhattacharyya
            </p>
          </div>
          <div className=" h-20 w-48">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <FiAward style={{ marginRight: '8px' }} /> FullStack Developer
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <FiAward style={{ marginRight: '8px' }} /> AI/ML Developer
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <FiAward style={{ marginRight: '8px' }} /> Android app Developer
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
