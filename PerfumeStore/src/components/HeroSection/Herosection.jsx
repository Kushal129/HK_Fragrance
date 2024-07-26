import React from 'react';
import herobg from '../../assets/images/herobg.jpg';
const Herosection = () => {
    return (
        <div>
            <div className="relative flex justify-center items-center h-screen">
                <img className="w-full h-full object-cover" src={herobg}alt="Hero Background" />
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <h1 className="text-white/60 text-5xl sm:text-4xl md:text-8xl lg:text-9xl font-bold">HK Perfumes</h1>
                </div>
            </div>
        </div>
    );
};

export default Herosection;