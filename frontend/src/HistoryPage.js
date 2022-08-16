import React, { Fragment, useRef, useState } from "react";
import axios from "axios";

function HistoryPage() {
  const orderIdRef = useRef("");
  const emailInputRef = useRef("");
  const [getSuccess, setGetSuccess] = useState(false);
  const [history, setHistory] = useState({
    orderId: "",
    emailInput: "",
    flightId: "",
    flight: "",
    hotelroomId: "",
    stay: "",
    price: 0,
  });

  const submitForm = (event) => {
    event.preventDefault();

    axios
      .post(
        `http://localhost:5001/history/postGetHistory`,
        {
          orderId: orderIdRef.current.value,
          emailInput: emailInputRef.current.value,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setGetSuccess(true);
        setHistory({
          orderId: response.data.orderId,
          emailInput: response.data.emailInput,
          flightId: response.data.flightId,
          flight: response.data.flight,
          hotelroomId: response.data.hotelroomId,
          stay: response.data.stay,
          price: response.data.price,
        });
        // console.log(response.data);
      })
      .catch((err) => {
        // navigate('/result', {
        //   state:err.response.data.message
        // });
      });
  };

  let formLayout = (
    <form onSubmit={submitForm}>
      <div id="orderIdInputField">
        <div>
          <label>Order ID</label>
        </div>
        <input
          ref={orderIdRef}
          type="text"
          id="orderIdInput"
          name="orderIdInput"
        />
      </div>

      <br />
      <br />
      <div id="emailInputField">
        <div>
          <label>Your Email Address</label>
        </div>
        <input
          ref={emailInputRef}
          type="text"
          id="emailInput"
          name="emailInput"
        />
      </div>

      <input type="submit" value="Submit" />
    </form>
  );

  let historyLayout = (
    <Fragment>
      <h5>Order ID: {history.orderId}</h5>
      <h5>Email: {history.emailInput}</h5>
      <h5>Flight: {history.flight}</h5>
      <h5>Stay: {history.stay}</h5>
      <h5>Price: {history.price}</h5>
    </Fragment>
  );

  return (
    <Fragment>
      <h3>History Page</h3>
      {getSuccess ? historyLayout : formLayout}
    </Fragment>
  );
}

export default HistoryPage;
