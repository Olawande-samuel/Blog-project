const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogs",
});

db.connect((err) => {
  console.log("mysql connected");
});

router.post("/post", (req, res) => {
  blogdetails = req.body;
  let sql = "INSERT INTO posts SET ? ";
  db.query(sql, blogdetails, (err, result) => {
    if (err) throw err;
    console.log("Post added successfully");
    res.redirect("/blogs");
  });
});
router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/blogs", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    results = JSON.parse(JSON.stringify(result));
    res.render("blog", { title: "Blogs", results });
  });
});

router.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  let sql = " SELECT * FROM posts WHERE id = " + mysql.escape(id);
  db.query(sql, (err, result) => {
    if (err) throw err;
    blogs = JSON.parse(JSON.stringify(result));
    res.render("myBlog", { title: "my blog", blogs });
    console.log(blogs);
  });
});

router.get("/createBlog", (req, res) => {
  res.render("createBlog", { title: "Create New Blog" });
});

module.exports = router;
