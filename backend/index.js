import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser"
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import studentAuth from "./routes/student.js"

const app = express()


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


dotenv.config();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.use("/api/auth",authRoute);
app.use("/api/student",studentAuth);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went Wrong"
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
    })
  })
  

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});