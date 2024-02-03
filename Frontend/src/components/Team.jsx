import React from 'react';
import './Team.css';

function Team() {
    return (
        <div className='flex gap-5'>
          
            <div className='card w-60 h-80 m-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-800 to-teal-800 shadow-2xl shadow-green-950 backdrop-blur-lg backdrop-filter opacity-20'>
             
                <div className='w-52 h-32 rounded-tr-[72px] m-5 border-2 border-green-400 rounded-lg'><h1></h1></div>
                <div className='w-52 m-5 h-8 border-2 border-green-400 rounded-md'></div>
             
              
            </div>
           
           
            <div className='card w-60 h-80 m-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-600 to-teal-600 shadow-2xl shadow-green-950 flex'>
                <div className='h-36 w-10 m-5 mb-1 border-2 border-green-400 rounded-lg '></div>
                <div className='w-36 ml-20 h-32 rounded-tr-[72px] absolute mt-5 border-2 border-green-400 rounded-lg'></div>
                <div className='w-52 m-5 mt-2 mb-2 h-8 border-2 border-green-400 rounded-md'></div>
                <div className='w-52 ml-5 h-28 rounded-bl-[72px] m-4 mt-2  border-2 border-green-400 rounded-lg'></div>
           
              
           
            </div>
            
            <div className='card w-60 h-80 m-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-800 to-teal-800 shadow-2xl shadow-green-950 backdrop-blur-lg backdrop-filter opacity-20'>
              
                <div className='w-52 h-32 rounded-tr-[72px] m-5 border-2 border-green-400 rounded-lg'></div>
                <div className='w-52 m-5 h-8 border-2 border-green-400 rounded-md'></div>
              
              
            </div>
           
            <div className='card w-60 h-80 m-4 rounded-tr-[80px] rounded-bl-[80px] rounded-md bg-gradient-to-tl from-green-600 to-teal-600 shadow-2xl shadow-green-950 '>
             
                <div className='w-52 h-32 rounded-tr-[72px] m-5 border-2 border-green-400 rounded-lg'></div>
                <div className='w-52 m-5 h-8 border-2 border-green-400 rounded-md'></div>
              
             
            
          </div>
    
        
        </div>
      );
    }
    
    export default Team;