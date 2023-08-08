const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const userRouter=require("./controllers/users")
const loginRouter=require("./controllers/login");
const proizvodRouter = require("./controllers/proizvodi");


mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor)
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/login",loginRouter)
app.use("/",proizvodRouter)

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
