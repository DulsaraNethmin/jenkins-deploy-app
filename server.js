const express = require("express");
const app = express();
const path = require("path");
const mongoos = require("mongoose");
const Student = require("./model/studentModel");

mongoos.connect("mongodb://root:root@localhost:27017/school-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
});

mongoos.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoos.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/addStudent", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/addStudent.html"));
});

app.post("/api/students", async (req, res) => {
  console.log(req.body);
  const student = new Student({
    name: req.body.name,
    institute: req.body.institute,
    email: req.body.email,
  });
  try {
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (err) {
    res.json({ message: err });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
