const express = require("express");
const connectToDb = require("./utils/db");
const specialityRouter = require("./routes/specialityRoute");
const studentRouter = require("./routes/studentRoute");
const sectionRouter = require("./routes/sectionRoute");
const moduleRouter = require("./routes/moduleRoute");
const marksRouter = require("./routes/marksRoute");
const semesterRouter = require("./routes/semesterRoute");
const decisionRouter = require("./routes/decisionRoute");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectToDb();

//middleweres
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.100.7:5173"],
    credentials: true,
  })
);

//loggerr
app.use((req, res, next) => {
  console.log(`- REQUESTING : ${req.method} => ${req.url}`);
  console.log("." + req.body.semesterCode + ".");
  next();
});
// app.use((req, res, next) => {
//   console.log(req.cookies.access_token);
//   next();
// });

//routers
app.use("/api/v1/specialities", specialityRouter);
app.use("/api/v1/sections", sectionRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/modules", moduleRouter);
app.use("/api/v1/marks", marksRouter);
app.use("/api/v1/semesters", semesterRouter);
app.use("/api/v1/decisions", decisionRouter);
app.use("/api/v1/users", userRouter);

//catch error middlewere
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || "error",
    statusCode: err.statusCode || 500,
    message: err.message || "something went wrong",
  });
});
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
