import React, { Fragment, useRef, useState } from "react";

function HistoryPage() {
  const emailInputRef = useRef("");
  const orderIdInputRef = useRef("");
  const [getSuccess, setGetSuccess] = useState(false);

  let packages = [
    { id: 1, flight: "Flight-1", stay: "2022-08-09", price: 100, quota: 1 },
    { id: 2, flight: "Flight-2", stay: "2022-08-09", price: 100, quota: 2 },
    { id: 3, flight: "Flight-3", stay: "2022-08-10", price: 100, quota: 2 },
    { id: 4, flight: "Flight-3", stay: "2022-08-11", price: 100, quota: 2 },
  ];

  let packageTableData = packages.map((value) => {
    let { id, flight, stay, price } = value;
    return (
      <tr key={id} id={id}>
        <td>{flight}</td>
        <td>{stay}</td>
        <td>{price}</td>
      </tr>
    );
  });

  const submitForm = (event) => {
    event.preventDefault();
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append("orderIdInput", orderIdInputRef.current.value);
    loginFormData.append("emailInput", emailInputRef.current.value);
  };

  return (
    <Fragment>
      <h3 style={{ fontFamily: "Roboto" }}>History Page</h3>

      <div id="packageTable">
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Stay</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{packageTableData}</tbody>
        </table>
      </div>

      <br />
      <br />
      <form onSubmit={submitForm}>
        <div id="orderIdInputField">
          <div>
            <label>Order ID</label>
          </div>
          <input
            ref={emailInputRef}
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
    </Fragment>
  );
}

export default HistoryPage;
