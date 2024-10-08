const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const {
  invalidPathHandler,
  errorResponserHandler,
} = require("./middelware/errorMiddelware");

dotenv.config();

// Routers
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const PORT = 5050;

const app = express();

//connect DB
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(invalidPathHandler);
app.use(errorResponserHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
