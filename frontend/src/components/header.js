import React from "react";

export default function Header(props) {
  return (
    <div class="container">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="navUsername" aria-current="page" href="/profile"
            >Welcome {props.user.user}!</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="linkLogout" href="/logout">Log Out</a>
        </li>
      </ul>
    </div>
  );
}
