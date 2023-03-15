import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">LogIn</Link>
        </li>

        <li>
          <Link to="/my-page">MyPage</Link>
        </li>
        <li>
          <Link to="/sentency">Sentency</Link>
        </li>
        <li>
          <Link to="/hi-five">Hi-Five</Link>
        </li>
        <li>
          <Link to="/speedoodle">Speedoodle</Link>
        </li>
        <li>
          <Link to="/review-note">ReviewNote</Link>
        </li>
      </ul>
    </>
  );
}

export default NavBar;
