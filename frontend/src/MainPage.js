import React, { Fragment } from "react";
import { Link } from "react-router-dom";
function MainPage() {
  return (
    <Fragment>
      <h3>Main Page</h3>

      <Link to="/selectPage">
        <a>Select Page</a>
      </Link>

      <br /> <br />

      <Link to="/historyPage">
        <a>History Page</a>
      </Link>
      
    </Fragment>
  );
}

export default MainPage;
