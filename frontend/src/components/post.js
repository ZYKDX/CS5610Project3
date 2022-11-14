import React from "react";
import { useState,useEffect } from "react";
import Header from "./header";

export default function Post() {
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

  return (
    <div>
    <Header user="test"></Header>
      <div class="container-md">
        <h1 id="title" class="text-center mb-4">{post.title}</h1>
        <h5 id="content" class="mb-4">{post.content}</h5>
        <div class="d-flex justify-content-center">
          <button id="author" type="button" class="btn btn-primary mx-5">
            Contact Author
          </button>
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
