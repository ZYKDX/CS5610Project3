import React, { useState, useEffect } from "react";

export default function Header(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
    });
  }, []);

  return (
    <div class="container">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="navUsername"
            aria-current="page"
            href="/profile"
          >
            Welcome {user}!
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="linkLogout" href="/logout">
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
}

async function getUsername() {
  const res = await fetch("/getCurrentUser");
  if (res.status !== 200) {
    return;
  }
  const json = await res.json();
  if (!json.isLoggedIn) {
    window.location.href = "/";
    return;
  }
  return json.user.user;
}
