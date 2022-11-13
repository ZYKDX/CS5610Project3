import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/signin";

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
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

async function getUsername() {
  const res = await fetch("/api/user");
  if (res.status === 200) {
    const users = await res.json();
    const username = await users.username;
    return username;
  }
}