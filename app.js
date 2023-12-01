const express = require("express");
const connectToDb = require("./utils/db");
const specialityRouter = require("./routes/specialityRoute");
const sectionRouter = require("./routes/sectionRoute");

const app = express();

connectToDb();

//middleweres
app.use(express.json());
//loggerr
app.use((req, res, next) => {
  console.log(`- REQUESTING : ${req.method} => ${req.url}`);
  next();
});

//routers
app.use("/api/v1/specialities", specialityRouter);
app.use("/api/v1/sections", sectionRouter);

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
