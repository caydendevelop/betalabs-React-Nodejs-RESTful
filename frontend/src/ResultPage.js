import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

function ResultPage(props) {
  const location = useLocation();
  const responseData = location.state;

  const successLayout = (
    <Fragment>
      <div>message: {responseData.message}</div>
      <div>orderId: {responseData.orderId}</div>
      <div>email: {responseData.emailInput}</div>
    </Fragment>
  );

  const failedLayout = (
    <Fragment>
      <div>message: {responseData.message}</div>
    </Fragment>
  )

  return (
    <Fragment>
      <h3>Result Page</h3>
      {responseData.orderId === undefined ? failedLayout : successLayout}
    </Fragment>
  );
}

export default ResultPage;
