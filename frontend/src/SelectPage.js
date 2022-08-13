import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function SelectPage() {
  const packageSelectionRef = useRef(0);
  const emailInputRef = useRef("");
  let navigate = useNavigate();

  let packages = [
    { id: 1, flight: "Flight-1", stay: "2022-08-09", price: 100, quota: 1 },
    { id: 2, flight: "Flight-2", stay: "2022-08-09", price: 100, quota: 2 },
    { id: 3, flight: "Flight-3", stay: "2022-08-10", price: 100, quota: 2 },
    { id: 4, flight: "Flight-3", stay: "2022-08-11", price: 100, quota: 2 },
  ];

  let packageTableData = packages.map((value) => {
    let { id, flight, stay, price, quota } = value;
    return (
      <tr key={id} id={id}>
        <td>{id}</td>
        <td>{flight}</td>
        <td>{stay}</td>
        <td>{price}</td>
        <td>{quota}</td>
      </tr>
    );
  });

  let packageOptionData = packages.map((value) => {
    let { id } = value;
    return (
      <option key={id} value={id}>
        {id}
      </option>
    );
  });

  const submitForm = (event) => {
    event.preventDefault();
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append("packageSelection", packageSelectionRef.current.value);
    loginFormData.append("emailInput", emailInputRef.current.value);

    console.log(loginFormData.get("packageSelection"));
    console.log(loginFormData.get("emailInput"));

    navigate('/result', {
      state:{
        packageSelection:packageSelectionRef.current.value,
        emailInput:emailInputRef.current.value
      }
    });

    // try {
    //   // make axios post request
    //   const response = await axios({
    //     method: "post",
    //     url: "/api/login",
    //     data: loginFormData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // } catch(error) {
    //   console.log(error)
    // }
  };

  return (
    <Fragment>
      <h3 style={{ fontFamily: "Roboto" }}>Select Page</h3>

      <div id="packageTable">
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Flight</th>
              <th>Stay</th>
              <th>Price</th>
              <th>Quota</th>
            </tr>
          </thead>
          <tbody>{packageTableData}</tbody>
        </table>
      </div>

      <br />
      <br />
      <form onSubmit={submitForm}>
        <div id="selectField">
          <div>
            <label>Select the Package</label>
          </div>
          <select
            ref={packageSelectionRef}
            id="packageSelection"
            name="packageSelection"
          >
            {packageOptionData}
          </select>
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

export default SelectPage;