import React, { useEffect, useState } from "react";
import paragon from "../../assets/paragon.png";
import { Button } from "react-bootstrap";
import { signout } from "../user/api-auth";
import { Link } from "react-router-dom";
import authHelpers from "../user/auth-helpers";

const btnStyle = {
  borderRadius: "0px",
};

/* eslint-disable */

export default function Header({ name, id }) {
  const [isMenu, setIsMenu] = useState(false);
  const [firstName, setFirstName] = useState("");
  const jwt = authHelpers.isAuthenticated();

  const today = new Date();
  const stringDate = today.toString();
  const date =
    stringDate.slice(0, 3) +
    ", " +
    "(" +
    today.getDate() +
    "." +
    (today.getMonth() + 1) +
    ".)";

  const logout = (e) => {
    const user = {
      name: name || undefined,
      id: id || undefined,
    };

    signout(user);
    sessionStorage.removeItem("token");

    if (sessionStorage.getItem("googleLogin")) {
      sessionStorage.removeItem("googleLogin");
    }

    window.location.assign("/");
  };

  useEffect(() => {
    if (sessionStorage.getItem("googleLogin")) {
      let user = JSON.parse(localStorage.getItem("token"));
      return setFirstName(user.user.firstName);
    }

    const token = JSON.parse(sessionStorage.getItem("token"));
    const tempUser = token.user;

    setFirstName(tempUser.firstName);
  }, []);

  return (
    <div className="header">
      <img src={paragon} alt="logo" />
      <h2 className="header-title">Personal Expense Tracker and Analyst</h2>
      <p className="header-date">{date}</p>
      <p className="header-user">Hello, {firstName}</p>

      <div className="header-buttons">
        <Button variant="outline-success" onClick={() => setIsMenu(!isMenu)}>
          Profile
        </Button>
        <Button variant="outline-danger" onClick={logout}>
          Logout
        </Button>
      </div>

      {isMenu ? (
        <div className="menu">
          <Link to={"/user/edit/" + id}>
            <Button variant="outline-dark" style={btnStyle}>
              Edit Profile
            </Button>
          </Link>
          <Link to={"/user/edit/password/" + id}>
            <Button variant="outline-dark" style={btnStyle}>
              New Password
            </Button>
          </Link>
          <Link to={"/user/delete/" + id}>
            <Button variant="outline-dark" style={btnStyle}>
              Delete Account
            </Button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
