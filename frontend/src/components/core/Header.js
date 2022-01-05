import React, { useEffect, useState } from "react";
import paragon from "../../assets/paragon.png";
import { Button } from "react-bootstrap";
import { signout } from "../user/api-auth";
import authHelpers from "../user/auth-helpers";
import axios from "axios";

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

    signout(user).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        sessionStorage.removeItem("token");

        if (sessionStorage.getItem("googleLogin")) {
          sessionStorage.removeItem("googleLogin");
        }

        window.location.assign("/");
      }
    });
  };

  useEffect(async () => {
    let cache = await axios.get("http://localhost:5000/api/cache");
    let user = cache.data;
    setFirstName(user.firstName);
  }, []);

  return (
    <div className="header">
      <img src={paragon} alt="logo" />
      <h2 className="header-title">Personal Expense Tracker and Analyst</h2>
      <p className="header-date">{date}</p>
      <p className="header-user">Hello, {firstName}</p>

      <div className="header-buttons">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Profile
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href={"/user/edit/" + id}>
              Edit Profile
            </a>
            <a className="dropdown-item" href={"/user/edit/password/" + id}>
              New Password
            </a>
            <a className="dropdown-item" href={"/user/delete/" + id}>
              Delete Account
            </a>
          </div>
        </div>

        <Button variant="outline-danger" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
