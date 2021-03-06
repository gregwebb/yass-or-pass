import React from "react";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import "./Navigation.css";

const emojis = ["ð»", "ð½", "ð§", "ð©", "ð¨", "ð§", "ðµ", "ð´"];

export default function Navigation({ user, handleLogout }) {
  return (
    <Segment className="navigation" clearing>
      <a href=".">
        <div className="title">
          <div className="yass-title">YASSð</div>
          <div className="or-title">or</div>
          <div className="pass-title">PASSð</div>
        </div>
      </a>
      <a href={`/${user.username}`}>
        <div className="emoji">{emojis[user.emoji]}</div>
      </a>
      <div className="logout">
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </Segment>
  );
}
