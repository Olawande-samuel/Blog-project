const express = require("express");
const path = require("path");
const people = require("./data");
const blogRoutes = require("./Routes/blogRoutes");


const app = express();
// app.set("views", __dirname + "./Views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.use(blogRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen("3000", () => console.log("server started"));
