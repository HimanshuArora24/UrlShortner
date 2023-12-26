require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const urlRoutes = require("./routes/urls");
const cors = require("cors")

// express app
const app = express();

app.use(
  cors({
    origin: ["https://url-shortner-himanshu-aroras-projects.vercel.app"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/urls", urlRoutes);
app.use("/api/user", userRoutes);


// connect to db
mongoose
  .connect("mongodb+srv://hunnyarora2002:PAu4wKxzEfAB9DT6@cluster0.qhjh6cy.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port, ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = app;
