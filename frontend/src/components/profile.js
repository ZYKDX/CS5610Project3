import React from "react";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    user: "",
    program: "",
   });

  useEffect(() => {
    getUser().then((profile) => {
      setProfile({
        user: profile.user.user,
        program: profile.user.program,
      });
    });
  }, []);

  return (
    <div class="container-md">
      <main>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="./index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="navUsername" aria-current="page" href="./"
              >Welcome</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="linkLogout" href="/logout">Log Out</a>
          </li>
        </ul>
        <div class="h1">About me</div>
        <table class="table table-default">
        <tbody>
          <tr>
            <th>User Name</th>
            <td id="username">{profile.user}</td>
          </tr>
          <tr>
            <th>Program</th>
            <td id="program">{profile.program}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td id="location"></td>
          </tr>
          <tr>
            <th>Offers</th>
            <td id="offers"></td>
          </tr>
          <tr>
            <th>Skills</th>
            <td id="skills"></td>
          </tr>
          <tr>
            <th>Email</th>
            <td id="email"></td>
          </tr>
        </tbody>
        </table>
        <div class="d-flex justify-content-center">
          <button id="edit" type="button" class="btn btn-primary mx-5">
            Edit
          </button>
        </div>
      </main>
    </div>
  );
}

async function getUser() {
  const res = await fetch("/getCurrentUser");
  if (res.status === 200) {
    const user = await res.json();
    if (user.isLoggedIn) {
      return user;
    } else {
      window.location.href = "/";
    }
  }
}
