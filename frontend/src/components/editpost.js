import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";

export default function EditPost() {
    const [values, setValues] = useState({
        title: "",
        content: "",
      });

  useEffect(() => {
    getPost().then((values) => {
      setValues({
        title: values.title,
        content: values.content
      });
    });
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
    console.log(values);
  }

  async function onSubmit(evt) {
    console.log("onsubmit");
    evt.preventDefault();
    const data = {
        title: values.title,
        content: values.content
    };
    const res = await fetch("./updatePost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      setTimeout(() => (window.location.href = "/post"), 2000);
    }
  }

  return (
    <div class="container-md">
      <Header></Header>
      <div class="h1">Edit Post</div>
      <form method="post" onSubmit={onSubmit}>
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input
            name="title"
            class="form-control"
            value={post.title}
            onChange={handleChange}
          ></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Content</label>
          <input
            name="content"
            class="form-control"
            value={post.content}
            onChange={handleChange}
          ></input>
        </div>
        <div class="d-grid gap-2 mt-5">
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

async function getPost() {
  const cur = await fetch("/getPost");
  if (cur.status !== 200) {
    return;
  }
  const res = await fetch("./getPost");
  const post = await res.json();
  console.log(post);
  return post;
}
