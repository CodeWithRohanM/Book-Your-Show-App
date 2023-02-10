
# Book Your Show App

## Introduction
Book_Your_Show is a movie booking application that enables users to easily select a Movie, Time Slot, and Seat Type of their choice. The app provides real-time updates on the latest booking and also allows users to view their previous bookings as well. It is designed to provide a seamless and convenient booking experience to movie-goers.

## Overview 
Book_Your_Show is a movie booking platform that offers a user-friendly and convenient way to book movie tickets. Users can select their desired movie, time slot, and seat type, and make the booking with a single click on the "Book Now" button. The platform provides access to recent and previous bookings, and validations have been added at every step to ensure accurate information is entered. The use of localstorage ensures that the booking process is not disrupted even on accidental page refresh. Book_Your_Show provides a seamless and stress-free movie booking experience for users.

## Features

- Easy movie selection: Choose from a wide range of movies available for booking.
- Time slot selection: Pick a time slot that suits your schedule.
- Seat type selection: Choose from different seat types such as Type A1, Type A2, Type D1, etc.
- Real-time updates: Get instant booking details on your latest booking.
- Previous bookings: View your previous booking made through the app.
- No bookings found message: In case there are no previous bookings, a "No bookings found" message will be displayed.
- Data retention: User selections are stored in local storage, ensuring that data is not lost even after a page refresh.
- Successful booking alerts with movie name and successful booking message.
- Restriction on negative values for seat type.
- User-friendly interface with clear navigation.




## Technical Details
- Book_Your_Show is built using both Front & Backend Technologies like #ReactJs, #Node.js, #Express, #MongoDB & #Mongoose.
- It uses local storage to retain the values of movie name, time slot, and seat type, even on page refresh, ensuring that the user's booking process is not disrupted.
- The application also implements thorough validation to ensure that the user selects the required information before making a booking.
- The validation checks for a movie name, time slot, and seat type and provides appropriate error messages in case of any missing information.
## How To Use
- Open the Book_Your_Show app.
- Select the Movie you would like to book.
- Choose a preferred Time Slot.
- Select the Seat Type & the number of desired seats.
- Click on the 'Book Now button to confirm your booking.
- Your recent booking will be displayed in real-time. To view the previous booking, click on the 'Previous Booking' button.

## Requirements
- A web browser with local storage support (e.g. Google Chrome, Mozilla Firefox, etc.).


## Conclusion
Book_Your_Show is a user-friendly movie booking application that provides a hassle-free booking experience. With its real-time updates, previous bookings feature, and data retention capabilities, the app is a must-try for movie enthusiasts. Book_Your_Show offers a convenient and efficient way to book your movie tickets with enabled validations checkpoints to guide the user.


## API Schema Documentation
The API for Book_Your_Show consists of the following endpoints:

## Make Bookings

```http
  POST /api/booking
```

### Description
This endpoint allows the user to make a movie booking by sending the following details: movie name, time slot, seat type and number of seats.

### Parameters
The API expects the following parameters in the request body as JSON:

#### Save User Selection Into Databse 


```http
  {
    "getMovieName": "req.body.movieName",
    "getTimeSlot": "req.body.timeSlot",
    "getSlots": "req.body.slots",
  }
```

[ movie_name: ](required) The name of the movie that the user wants to book.

[ time_slot: ](required) The time slot for the movie booking.

[slots: ](required) The type of seat the user wants to book along with number of seats.




## Response
The API will return the following responses:

[200 OK:](required) The booking was made successfully. The response body will contain message of successful booking.


```http
  {
    "status": "Success",
    "message": "✅ Your Movie [movieName] + " Booked Successfully!! ✅ "
  }
```

[401 Unauthorized:](required) An error occurred during the booking process. The response body will contain an error message.

```http
  {
    "status": "Error",
    "message": "Error during booking process"
  }
```

## Get Previous Booking

```http
  GET /api/booking
```
### Description
This endpoint allows the user to retrieve the previous bookings that they have made.

### Parameters
None

### Response
The API will return the following responses:

[200 OK:](required) The previous bookings were retrieved successfully. The response body will contain the previous booking made by the user.

```http
  {
    "status": "Success",
    [
        {
            "movieName": "Movie Name",
            "timeSlot": "Time Slot",
            "slots": "Seat Type With No. Of Seats"
        }
    ]
}

```

[401 Unauthorized:](required) No previous bookings were found for the user. The response body will contain an error message.

```http
  {
    "status": "Error",
    "message": "No previous bookings found"
  }
```



## Demo

https://www.youtube.com/watch?v=MZyBTs9pZMg&ab_channel=RohanMote


## Authors

- [@rohan_mote ](https://github.com/CodeWithRohanM)

## FAQ

### Can Users Toggle Between Different Movies?
- Yes, the User can select a movie of his/her own choice and can easily toggle between them
### How Many Time Slots Are Available?
Currently, there are 4-time slots available.
### Can the User Select Multiple Seat Types?
- Of Course, users can easily select different seat types of their choice and can easily change them.
### Does A User Get The Latest Booking Made?
- Yes, the User gets the details of his/her latest booking as soon as he/she clicks on Book Now button.
### What If User Accidently Clicks On the Refresh Button? Will The User Selections Be Wiped Off?
- Of course not. We understand that such situations can appear anytime and to tackle them, we store the user selections in the storage of their browsers so that they can easily continue their bookings even after hitting refresh.
### Can User See The Previous Booking Made?
- Yes, the user can easily see his/her previous booking. If there is no previous booking made, our system shows the related message.


## Lessons Learned

- User Selection Storage - Learned how to take user inputs and store them in the Backend Database
- Fetching API's - Learned how to fetch different REST APIs to get the required data.
- The Power of Validation: Validation plays a critical role in ensuring the accuracy of data entered by users. In Book_Your_Show, validation has been implemented at every step to ensure that all required information is entered before making a booking. This helps in avoiding errors and ensures that the booking process runs smoothly.

- The Benefits of Localstorage: Localstorage is a powerful tool that can be used to retain values even on page refresh. In Book_Your_Show, localstorage has been used to retain the values of movie name, time slot, and seat type, ensuring that the booking process is not disrupted in case of any accidental page refresh.

