import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SelectPage() {
  const packageSelectionRef = useRef(0);
  const emailInputRef = useRef("");
  const [packageList, setPackageList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
			.get(`http://localhost:5000/getPackage`)
			.then((res) => {
				setPackageList(res.data.packages);
			})
			.catch((err) => {
				
			});
  }, [])

  
  let packageTableData = packageList.map((value) => {
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

  let packageOptionData = packageList.map((value) => {
    let { id } = value;
    return (
      <option key={id} value={id}>
        {id}
      </option>
    );
  });

  const submitForm = (event) => {
    event.preventDefault();
    
    axios
      .post(`http://localhost:5000/purchasePackage`, 
      {
        packageSelection: packageSelectionRef.current.value,
        emailInput: emailInputRef.current.value
      },
      {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        navigate('/result', {
          state:response.data
        });
        // console.log(response.data);
      })
      .catch((err) => {
        // navigate('/result', {
        //   state:err.response.data.message
        // });
      });
  };

  return (
    <Fragment>
      <h3>Select Page</h3>

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
