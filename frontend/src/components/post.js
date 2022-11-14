import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";

export default function Post() {
  const [user, setUser] = useState();
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    getPost().then((post) => {
      setPost({
        title: post.title,
        content: post.content,
        author: post.author,
      });
    });
  }, []);

  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
    });
  }, []);

  return (
    <div>
      <Header></Header>
      <div class="container-md">
        <h1 id="title" class="text-center mb-4">
          {post.title}
        </h1>
        <h5 id="content" class="mb-4">
          {post.content}
        </h5>
        <div class="d-flex justify-content-center">
          {post.author === user ? (
            <div>
              <button id="edit" type="button" class="btn btn-primary mx-5">
                Edit
              </button>
              <button id="delete" type="button" class="btn btn-danger mx-5">
                Delete
              </button>
            </div>
          ) : (
            <button id="author" type="button" class="btn btn-primary mx-5">
              Contact Author
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

async function getPost() {
  const p = new URLSearchParams(window.location.search);
  const res = await fetch("./getPost?id=" + p.get("id"));
  const post = await res.json();
  return post;
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
