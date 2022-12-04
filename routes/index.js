import express from "express";
import myDB from "../db/MyDB.js";

const router = express.Router();

// suggest using /api/getCurrentUser
router.get("/getCurrentUser", (req, res) => {
  res.json({
    isLoggedIn: !!req.session.user,
    user: req.session.user,
  });
});

router.post("/authenticate", async (req, res) => {
  // TODO: validate that the user data is correct
  const user = req.body;
  const success = await myDB.authenticate(user);
  if (success.success) {
    req.session.user = { user: user.user };
    res.json({
      isLoggedIn: true,
      err: null,
      user_details: success.user_details,
    });
  } else {
    req.session.user = null;
    res.json({ isLoggedIn: false, err: "Wrong User or Password" });
  }
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.json({ isLoggedIn: false, msg: "Logout successful" });
});

router.post("/api/signup", async (req, res) => {
  // Save user to db
  const user = req.body;
  const success = await myDB.createUser(user);
  if (!success) {
    res.json({ isLoggedIn: false, err: "User alreay exists" });
    return;
  }
  req.session.user = { user: user.user };
  res.json({ isLoggedIn: true, err: null, user_details: success.user_details });
});

router.get("/getUser", async (req, res) => {
  const user = await myDB.getUser(req.session.user);
  res.json(user);
});

router.post("/updateProfile", async (req, res) => {
  console.log(req.body);
  await myDB.updateProfile(req.session.user, req.body);
  res.json({ msg: "Profile updated" });
});

router.get("/listPosts", async (req, res) => {
  const posts = await myDB.listPosts(req.query.p);
  res.json(posts);
});

router.post("/createPost", async (req, res) => {
  await myDB.createPost(req.body, req.session.user);
  res.json({ msg: "Post saved" });
});

router.post("/updatePost", async (req, res) => {
  await myDB.updatePost(req.query.id, req.body);
  res.json({ msg: "Post updated" });
});

router.get("/deletePost", async (req, res) => {
  await myDB.deletePost(req.query.id);
  res.json({ msg: "Post deleted" });
});

router.get("/getPost", async (req, res) => {
  const post = await myDB.getPost(req.query.id);
  res.json(post);
});

router.get("/getEmail", async (req, res) => {
  const post = await myDB.getEmail(req.query.id);
  res.json(post);
});

export default router;
