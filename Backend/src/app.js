const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  credentials: true
};

if (process.env.NODE_ENV === "production") {
  // In production, allow requests from the same origin (Vercel domain)
  corsOptions.origin = function(origin, callback) {
    // Allow requests with no origin (like mobile apps or server-to-server requests)
    if (!origin) return callback(null, true);
    // In production, allow the frontend origin
    callback(null, true);
  };
} else {
  // In development, allow localhost:5173
  corsOptions.origin = "http://localhost:5173";
}

app.use(cors(corsOptions));

/* Require all the routes here */
const authRouter = require("./routes/auth.routes");

/*Require all the interview ai routes */
const interviewRouter = require("./routes/interview.routes");

/* Using all the auth routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
