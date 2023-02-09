import React from "react";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";

const App = () => {

    return <>

        <div className="flex flex-col w-screen h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 gap-y-4 overflow-y-auto">

            <Header />
            <Routes>
                <Route exact path="/" element={<HomePage />}></Route>
            </Routes>
        </div>


    </>
};

export default App;