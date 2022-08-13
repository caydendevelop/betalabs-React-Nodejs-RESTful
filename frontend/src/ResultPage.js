import React, { Fragment } from 'react';
import {useLocation} from 'react-router-dom';

function ResultPage(props) {
  const location = useLocation();


  return (
    <Fragment>
      <div>{location.state.packageSelection}</div>
      <div>{location.state.emailInput}</div>
    </Fragment>
    
  )
}

export default ResultPage