import React from "react";
import { NavLink } from "react-router-dom";
import siteLogo from "/Users/rohanmote/Desktop/Thapa Projects/Mini Projects/BookMyShow_Capstone/Server/client/src/Images/bookYourShow.png";

const Header = () => {

    return <>
        <div className="w-screen bg-gradient-to-r from-cyan-200 to-cyan-400 shadow-2xl ">
            <div className="container mx-auto w-screen p-5 items-center flex flex-col gap-y-4 font-bold antialiased md:flex-row md:justify-between tracking-wider">

                <NavLink to ="/"> <img src={siteLogo} className="h-14 w-32 hover:scale-110 hover:-translate-y-1 transition ease-in-out duration-300 active:scale-95"></img></NavLink>

                <div className="flex flex-col gap-y-3 items-center md:flex-row md:gap-x-6 bg-blue-400 px-3 md:px-7 md:py-3 rounded-md text-lg">
                    <NavLink to="/" 
                    style={({isActive})=>({
                        color: isActive? "#0818A8" : "black",
                        fontWeight: isActive? "800" : ""
                    })}
                    className="cursor-pointer">Home</NavLink>
                </div>

            </div>
        </div>
    </>
};

export default Header;