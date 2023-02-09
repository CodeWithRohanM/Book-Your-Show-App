import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {

    // Getting Local Storage Data
    let getLocalMovieName = localStorage.getItem("localMovieName");
    let getLocalTimeSlot = localStorage.getItem("localTimeSlot");

    let getLocalSeatType = localStorage.getItem("localSeatType");
    let localStore = JSON.parse(getLocalSeatType);

    let activeMovie = localStorage.getItem("activeMovie");
    let activeTimeSlot = localStorage.getItem("activeTimeSlot");


    // States To Store The Use Selection 
    const [movieName, setMovieName] = useState(getLocalMovieName);
    const [timeSlot, setTimeSlot] = useState(getLocalTimeSlot);
    const [slots, setSlots] = useState({
        A1: localStore.A1,
        A2: localStore.A2,
        A3: localStore.A3,
        A4: localStore.A4,
        D1: localStore.D1,
        D2: localStore.D2,
    });



    // Getting Response From "GET API" and updating the respective States
    const [responseMovieName, setResponseMovieName] = useState("");
    const [responseSlots, setResponseSlots] = useState({});
    const [responseTimeSlot, setResponseTimeSlot] = useState("");


    // States To Display Different Colour On User Selection Of Movie Name & Time Slot
    const [isActiveMovie, setIsActiveMovie] = useState(JSON.parse(activeMovie));
    const [isActiveTimeSlot, setIsActiveTimeSlot] = useState(JSON.parse(activeTimeSlot));


    // Trigger States To Display Loading Spinner & Respective Display Message
    const [bookMovie, setBookMovie] = useState(false);
    const [loader, setLoader] = useState(false);
    const [emptyData, setEmptyData] = useState(false);


    // Static Display Data 
    const [movieList, setMovieList] = useState([
        "Sooraj Par Mangal Bhari", "Tenet", "The Personal History Of David Copperfield", "The War With Grandpa", , "Come Play"
    ]);
    const [timeSlotList, setTimeSlotList] = useState(["10:00 AM", "1:00 PM", "3:00 PM", "8:00 PM"]);
    const [bookingText, setBookingText] = useState("Your Last Booking Details..");



    // Function To Display Latest Booking Without Manking Seperate GET Request
    const updateRecentBooking = () => {
        setLoader(true);
        setEmptyData(false);
        setBookingText("Your Recent Booking Details..");

        setTimeout(() => {
            setLoader(false);
            setBookMovie(true);
        }, 2000);

        //If Response if Successful, Then Updating The Respective States Using Data Received From Server
        setResponseMovieName(movieName);
        setResponseSlots(slots);
        setResponseTimeSlot(timeSlot);
    }



    // Method To Call The "POST API" Request & Store Data Into Database
    const saveMovieDetails = async (event) => {

        // Validation Check For Empty Fields (Movie Name, Time Slot && Seat Types)
        if (!movieName) {
            window.alert("🛑 Please Select Movie Name To Book.. 🛑");
        }
        else if (!timeSlot) {
            window.alert("🛑 Please Select A Time Slot To Proceed.. 🛑");
        }
        else if (slots.A1 == 0 && slots.A2 == 0 && slots.A3 == 0 && slots.A4 == 0 && slots.D1 == 0 && slots.D2 == 0) {
            window.alert("🛑 Please Select The Seats To Procced.. 🛑");
        }
        else {
            const getData = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    movieName: movieName,
                    timeSlot: timeSlot,
                    slots: slots,
                })
            });

            // Getting Response From The Server & Setting Actions Accordingly
            const getResponse = await getData.json();
            console.log(getResponse);

            if (getData.status === 200) {
                window.alert(getResponse.message);
                updateRecentBooking();
                // getBookingDetails();
            }
            else if (getData.status === 401) {
                window.alert(getResponse.error);
            }

            // Setting States Data To Empty When User Click The "Book Now" Button
            setMovieName("");
            setTimeSlot("");
            setSlots({
                A1: 0,
                A2: 0,
                A3: 0,
                A4: 0,
                D1: 0,
                D2: 0,
            });


            // Removing Different Colour Button That Used To Display The User Selection When User Selects "Book Now" Button
            setIsActiveMovie(-1);
            setIsActiveTimeSlot(-1);

            //Getting Id's Of Each Input Field To Reset Them To Initial States When User Clicks "Book Now" Button
            const getTypeA1ID = document.getElementById("typeA1");
            const getTypeA2ID = document.getElementById("typeA2");
            const getTypeA3ID = document.getElementById("typeA3");
            const getTypeA4ID = document.getElementById("typeA4");
            const getTypeD1ID = document.getElementById("typeD1");
            const getTypeD2ID = document.getElementById("typeD2");


            getTypeA1ID.selectedIndex = 0;
            getTypeA2ID.selectedIndex = 0;
            getTypeA3ID.selectedIndex = 0;
            getTypeA4ID.selectedIndex = 0;
            getTypeD1ID.selectedIndex = 0;
            getTypeD2ID.selectedIndex = 0;
        }
    }



    // Method To Call "GET API" Request To Server & Get Data From Database
    const getBookingDetails = async () => {
        setLoader(true);
        setEmptyData(false);
        setBookingText("Your Recent Booking Details..");

        setTimeout(() => {
            setLoader(false);
            setBookMovie(true);
        }, 2000);

        const getData = await fetch("/api/booking", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });


        //Getting Response From The Server
        const getResponse = await getData.json();

        if (getData.status === 401) {
            setEmptyData(true);

        }

        //If Response if Successful, Then Updating The Respective States Using Data Received From Server
        setResponseMovieName(getResponse[0].movieName);
        setResponseSlots(getResponse[0].slots);
        setResponseTimeSlot(getResponse[0].timeSlot);

    };


    // Storing The User Selection Into Browser Local Storage
    useEffect(() => {
        localStorage.setItem("localMovieName", movieName);
        localStorage.setItem("localTimeSlot", timeSlot);
        localStorage.setItem("localSeatType", JSON.stringify(slots));
        localStorage.setItem("activeMovie", JSON.stringify(isActiveMovie));
        localStorage.setItem("activeTimeSlot", JSON.stringify(isActiveTimeSlot));

    }, [movieName, timeSlot, slots, isActiveMovie, isActiveTimeSlot]);



    return <>
        {/* Main Contaier */}
        <div className="w-full flex-1 flex flex-col gap-y-6 md:flex-row md:gap-x-4 justify-between container mx-auto px-5 items-center ">

            {/* Container To Display Movie Name, Time Slot && Seat Type Components */}
            <div className="flex flex-col gap-y-4 items-center">

                <div className="flex flex-col gap-y-6 w-full bg-gradient-to-b from-sky-400 to-sky-200 rounded-xl p-5 shadow-2xl antialiased">
                    <h1 className="text-2xl font-bold text-gray-700 tracking-wider border-black border-b pb-2">Select A Movie</h1>

                    <div className="flex flex-row gap-x-6 items-center flex-wrap gap-y-3">
                        {
                            movieList.map((curValue, index) => {
                                return <h1
                                    className={`px-7 py-2 rounded-xl text-lg tracking-wider font-bold cursor-pointer hover:scale-105 transition ease-in-out duration-300 hover:-translate-y-1 active:scale-90 border-black border-b`}
                                    onClick={() => {
                                        setMovieName(curValue);
                                        setIsActiveMovie(index);
                                    }}
                                    style={{
                                        background: index === isActiveMovie ? "linear-gradient(to right, #9999ff 0%, #6699ff 100%)" : ""

                                    }}>
                                    {curValue}</h1>
                            })
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-y-6 w-full  bg-gradient-to-b from-sky-400 to-sky-200 rounded-xl shadow-2xl
                 p-5">
                    <h1 className="text-2xl font-bold text-gray-700 tracking-wider border-black border-b pb-2">Select A Time Slot</h1>

                    <div className="flex flex-row gap-x-6 w-full flex-wrap items-center gap-y-3 ">
                        {
                            timeSlotList.map((curValue, index) => {
                                return <h1 className={`px-7 py-2 rounded-xl cursor-pointer hover:scale-110 transition ease-in-out duration-300 hover:-translate-y-1 active:scale-90 border-black border-b`} onClick={() => {
                                    setTimeSlot(curValue);
                                    setIsActiveTimeSlot(index);
                                }}
                                    style={{
                                        background: index === isActiveTimeSlot ? "linear-gradient(to right, #9999ff 0%, #6699ff 100%)" : ""
                                    }}>{curValue}</h1>
                            })
                        }
                    </div>
                </div>

                <div className="flex flex-col w-full gap-y-4 bg-gradient-to-b from-sky-400 to-sky-200 rounded-xl shadow-2xl p-5 antialiased">
                    <h1 className="text-2xl font-bold text-gray-700 tracking-wider border-black border-b pb-2">Select The Seats</h1>
                    <div className="flex flex-col lg:flex-row gap-x-6 flex-wrap lg:flex-nowrap items-center gap-y-6 lg:gap-y-3 justify-center">

                        <div className="flex flex-col gap-y-3 rounded-xl text-center py-3 border-black border-b"
                        >
                            <h1 id="seatTypes" className="text-xl font-bold border-black border-b">Type A1</h1>

                            <input type="number"
                                className="w-2/5 px-1 py-1 rounded-md text-center items-center container mx-auto  font-bold"
                                value={slots.A1}
                                onChange={(event) => {
                                    const getValue = event.target.value;
                                    if (getValue < 0) {
                                        window.alert("🛑 Seats Cannot be Less Than Zero 🛑");
                                        return;
                                    }
                                    else if (getValue > 10) {
                                        window.alert("🛑 Cannot Book More Than 10 Seats In A Row 🛑");
                                        return;
                                    }
                                    else {
                                        setSlots((prevValue) => {
                                            return {
                                                ...prevValue,
                                                ["A1"]: getValue,
                                            }
                                        });
                                    }
                                }}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-y-3 rounded-xl text-center py-3 border-black border-b"
                        >
                            <h1 id="seatTypes" className="text-xl font-bold border-black border-b">Type A2</h1>

                            <input type="number"
                                className="w-2/5 px-1 py-1 rounded-md text-center items-center container mx-auto  font-bold"
                                value={slots.A2}
                                onChange={(event) => {
                                    const getValue = event.target.value;
                                    if (getValue < 0) {
                                        window.alert("🛑 Seats Cannot Be Less Than 0 🛑");
                                        return;
                                    }
                                    else if (getValue > 10) {
                                        window.alert("🛑 Cannot Book More Than 10 Seats In A Row 🛑");
                                        return;
                                    }
                                    else {

                                        setSlots((prevValue) => {
                                            return {
                                                ...prevValue,
                                                ["A2"]: getValue,
                                            }
                                        });
                                    }
                                }}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-y-3 rounded-xl text-center py-3 border-black border-b"
                        >
                            <h1 id="seatTypes" className="text-xl font-bold border-black border-b">Type A3</h1>

                            <input type="number"
                                className="w-2/5 px-1 py-1 rounded-md text-center items-center container mx-auto  font-bold"
                                value={slots.A3}
                                onChange={(event) => {
                                    const getValue = event.target.value;
                                    if (getValue < 0) {
                                        window.alert("🛑 Seats Cannot Be Less Than 0🛑");
                                        return;
                                    }
                                    else if (getValue > 10) {
                                        window.alert("🛑 Cannot Book More Than 10 Seats In A Row🛑");
                                        return;
                                    }
                                    else {
                                        setSlots((prevValue) => {
                                            return {
                                                ...prevValue,
                                                ["A3"]: getValue,
                                            }
                                        });
                                    }
                                }}
                            ></input>
                        </div>

                        <div className="flex flex-col gap-y-3 rounded-xl text-center py-3 border-black border-b"
                        >
                            <h1 id="seatTypes" className="text-xl font-bold border-black border-b">Type A4</h1>

                            <input type="number"
                                className="w-2/5 px-1 py-1 rounded-md text-center items-center container mx-auto  font-bold"
                                value={slots.A4}
                                onChange={(event) => {
                                    const getValue = event.target.value;
                                    if (getValue < 0) {
                                        window.alert("🛑 Seats Cannot Be Less Than 0 🛑");
                                        return;
                                    }
                                    else if (getValue > 10) {
                                        window.alert("🛑 Cannot Book More Than 10 Seats In A Row 🛑");
                                        return;
                                    }
                                    else {
                                        setSlots((prevValue) => {
                                            return {
                                                ...prevValue,
                                                ["A4"]: getValue,
                                            }
                                        });
                                    }
                                }}
                            ></input>
                        </div>




                        <div className="flex flex-col gap-y-3 rounded-xl text-center  py-3 border-black border-b"
                        >
                            <h1 id="seatTypes" className="text-xl font-bold border-black border-b">Type D1</h1>

                            <input type="number"
                                className="w-2/5 px-1 py-1 rounded-md text-center items-center container mx-auto font-bold"
                                value={slots.D1}
                                onChange={(event) => {
                                    const getValue = event.target.value;
                                    if (getValue < 0) {
                                        window.alert("🛑 Seats Cannot Be Less Than 0 🛑");
                                        return;
                                    }
                                    else if (getValue > 10) {
                                        window.alert("🛑 Cannot Book More Than 10 Seats In A Row 🛑");
                                        return;
                                    }
                                    else {
                                        setSlots((prevValue) => {
                                            return {
                                                ...prevValue,
                                                ["D1"]: getValue,
                                            }
                                        });
                                    }
                                }}
                            ></input>
                        </div>


                        <div className="flex flex-col gap-y-3 rounded-xl text-center  py-3 border-black border-b"
                        >
                            <h1 id="seatTypes" className="text-xl font-bold border-black border-b">Type D2</h1>

                            <input type="number"
                                className="w-2/5 px-1 py-1 rounded-md text-center items-center container mx-auto font-bold"
                                value={slots.D2}
                                onChange={(event) => {
                                    const getValue = event.target.value;
                                    if (getValue < 0) {
                                        window.alert("🛑 Seats Cannot Be Less Than 0 🛑");
                                        return;
                                    }
                                    else if (getValue > 10) {
                                        window.alert("🛑 Cannot Book More Than 10 Seats In A Row 🛑");
                                        return;
                                    }
                                    else {
                                        setSlots((prevValue) => {
                                            return {
                                                ...prevValue,
                                                ["D2"]: getValue,

                                            }


                                        });
                                    }

                                }}
                            ></input>
                        </div>

                    </div>
                </div>


                <div className="flex flex-row items-center justify-center gap-x-6 container mx-auto  max-w-sm md:max-w-3xl mt-4 flex-1">
                    <NavLink to="/"><button type="submit" onClick={saveMovieDetails} className="bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 px-3 py-2 md:px-6 md:py-2 rounded-md text-white text-md md:text-xl font-bold md:hover:scale-110 transition ease-in-out duration-300 md:active:scale-90 tracking-wider shadow-2xl">Book Now</button></NavLink>

                    <button type="button" className="bg-gradient-to-r from-sky-500 via-blue-500 to-blue-600 text-white font-bold tracking-wider text-md md:text-xl rounded-md px-3 py-2 md:px-6 md:py-2 md:hover:scale-110 md:hover:cursor-pointer md:active:scale-90 transition ease-in-out duration-300 shadow-2xl"
                        onClick={getBookingDetails}>Get Your Previous Booking</button>
                </div>
            </div>





            {/* Container To Display User Booking Details & Display Loader & Respective Messages */}
            <div className="flex w-full h-full md:w-4/12 md:justify-start  justify-center flex-col gap-y-8">
                {
                    loader && <div className="flex w-full items-center justify-center h-1/2 flex-col gap-y-6">
                        <h1 className="text-xl font-bold text-center tracking-wider text-gray-700">Loading Booking Details..</h1>
                        <img src="/images/LoadingGif.gif" className="w-28 h-16 rounded-xl"></img>
                    </div>
                }

                {
                    !loader && !bookMovie && <div className="bg-blue-300 p-4 h-fit flex flex-col gap-y-5 rounded-md shadow-2xl items-center">
                        <h1 className="text-2xl font-bold tracking-wide text-gray-700">No Previous Booking Found..</h1>
                        <img src="/images/sorry.png" className="h-20 w-20"></img>
                    </div>
                }

                {
                    emptyData && !loader && <div className="bg-blue-300 p-4 h-fit flex flex-col gap-y-5 rounded-md shadow-2xl items-center">
                        <h1 className="text-2xl font-bold tracking-wide text-gray-700">No Previous Booking Found..</h1>
                        <img src="/images/sorry.png" className="h-20 w-20"></img>
                    </div>
                }

                {

                    !emptyData && !loader && bookMovie && <div className="bg-blue-300 p-4 h-fit flex flex-col gap-y-3 rounded-md shadow-2xl">
                        <h1 className="text-2xl font-bold tracking-wider border-black border-b pb-2 text-gray-700">{bookingText}</h1>

                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-xl text-gray-700 font-normal">Seats:</h1>


                            <div className="flex flex-row gap-x-4 border-black border-b pb-3">

                                <div className="flex flex-col gap-y-2">
                                    <h1 className="text-gray-700 text-xl font-normal w-8">A1:</h1>
                                    <h1 className="text-gray-700 text-xl font-normal w-8">A2:</h1>
                                    <h1 className="text-gray-700 text-xl font-normal w-8">A3:</h1>
                                    <h1 className="text-gray-700 text-xl font-normal w-8">A4:</h1>
                                    <h1 className="text-gray-700 text-xl font-normal w-8">D1:</h1>
                                    <h1 className="text-gray-700 text-xl font-normal w-8">D2:</h1>

                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <h1 className="text-gray-700 text-xl font-bold w-8">{responseSlots.A1}</h1>
                                    <h1 className="text-gray-700 text-xl font-bold w-8">{responseSlots.A2}</h1>
                                    <h1 className="text-gray-700 text-xl font-bold w-8">{responseSlots.A3}</h1>
                                    <h1 className="text-gray-700 text-xl font-bold w-8">{responseSlots.A4}</h1>
                                    <h1 className="text-gray-700 text-xl font-bold w-8">{responseSlots.D1}</h1>
                                    <h1 className="text-gray-700 text-xl font-bold w-8">{responseSlots.D2}</h1>
                                </div>
                            </div>

                            <div className="flex flex-row gap-x-3">
                                <div className="flex flex-col gap-y-3">
                                    <h1 className="text-gray-700 text-xl font-normal">TimeSlot:</h1>
                                    <h1 className="text-gray-700 text-xl font-normal">Movie:</h1>
                                </div>

                                <div className="flex flex-col gap-y-3">
                                    <h1 className="text-gray-700 text-xl font-bold">{responseTimeSlot}</h1>
                                    <h1 className="text-gray-700 text-xl font-bold">{responseMovieName}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </>
};

export default HomePage;