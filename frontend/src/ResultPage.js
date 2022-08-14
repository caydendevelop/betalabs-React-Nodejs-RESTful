import React, { Fragment } from 'react';
import {useLocation} from 'react-router-dom';

function ResultPage(props) {
  const location = useLocation();
  const responseData = location.state;

  return (
    <Fragment>
      <div>message: {responseData.message}</div>
      <div>orderId: {responseData.orderId}</div>
      <div>email: {responseData.emailInput}</div>
    </Fragment>
    
  )
}

export default ResultPage