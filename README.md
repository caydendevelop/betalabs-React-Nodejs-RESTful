# betalabs-ex

Notes before running the website

  - Running on macOS (Not tested on Windows or other OS, not sure whether there would be any bugs or unknown errors)
  - Go to betalabs-ex/frontend and run "npm install" 
    - run "npm start" 
  - Go to betalabs-ex/backend and run "npm install" 
    - run "npm start"

History Searching Features

  - Go to History Page (http://localhost:3000/historyPage)
  - Type the orderId and emailInput 
    - Could be found in history-data.json file
    
Pure backend endpoint for reserving flight

  - POST Request (http://localhost:5001/flight/postReserveFlight)
  - Body
    - flightId (Could be found in flight-data.json)
    - emailInput
    
Pure backend endpoint for reserving hotelroom

  - POST Request (http://localhost:5001/hotelroom/postReserveHotelroom)
  - Body
    - flightId (Could be found in flight-data.json)
    - hotelroomId (Could be found in hotelroom-data.json)
    - emailInput
