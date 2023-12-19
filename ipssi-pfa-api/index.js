// IMPORTS

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

const cookieParser = require("cookie-parser");
// VARIABLES
const app = express();
const { PORT, CONFIG, PROD_URL, DEV_URL } = process.env;

const corsOptions = {
  origin: CONFIG === "DEVELOPMENT" ? DEV_URL : PROD_URL,
  credentials: true,
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// ROUTES

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Bienvenue sur l'api" });
});

app.listen(PORT, () => {
  console.log(`use api on http://localhost:${PORT}`);
});
