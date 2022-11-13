import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

/* This is the Signin component that enables user to sign in. */
export default function Signin() {
  const [values, setValues] = useState({
    userid: "",
    password: "",
    email: "",
  });

  async function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      userid: values.userid,
      password: values.password,
      email: values.email,
    };
    // const res = await fetch("/api/signin", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // if (res.status === 200) {
    //   alert("Sign in successful!");
    // } else {
    //   alert("Sign in failure, please check your username or password");
    // }
    // window.location.href = "/";
  }

  return (
    <div class="container mt-5">
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
          id="msg"
        >
          <span id="msgContent"></span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <h1 class="text-center">Welcome to NEU Align Career!</h1>
        <form id="login" method="post" onSubmit={onSubmit}>
          <div class="form-outline mb-4">
            <input
              type="user"
              id="form2Example1"
              name="user"
              class="form-control"
              required="true"
            />
            <label class="form-label" for="form2Example1">User ID</label>
          </div>

          <div class="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              name="password"
              class="form-control"
              required="true"
            />
            <label class="form-label" for="form2Example2">Password</label>
          </div>

          <div class="form-outline mb-4">
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              required="true"
            />
            <label class="form-label" for="form2Example3">NEU Email Address (This site is currently open to NEU students only)</label>
          </div>

          <button type="submit" class="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div class="text-center">
            <p>Not a member? <a href="./signup.html">Register</a></p>
          </div>
        </form>
    </div>
  );
}