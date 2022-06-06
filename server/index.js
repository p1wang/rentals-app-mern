import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import listingsRoutes from "./routes/listings.js";
import usersRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";

const app = express();

dotenv.config();

app.use(express.json({ limit: "30MB", extended: true }));
app.use(express.urlencoded({ limit: "30MB", extended: true }));
app.use(cors());

app.use("/listings", listingsRoutes);
app.use("/users", usersRoutes);
app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
