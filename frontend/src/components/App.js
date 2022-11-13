import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";
import Homepage from "./homepage";

export default function App() {
  const [user, setUser] = useState();
  const [list, setList] = useState([]);
  const [expense, setExpense] = useState({});

  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Homepage user={user} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

async function getUsername() {
  const res = await fetch("/getCurrentUser");
  console.log(res);
  if (res.status === 200) {
    const users = await res.json();
    const username = users.user;
    return username;
  }
}
