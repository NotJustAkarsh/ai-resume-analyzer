const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

/* Require all the routes here */
const authRouter = require("./routes/auth.routes");

/*Require all the interview ai routes */
const interviewRouter = require("./routes/interview.routes");

/* Using all the auth routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
