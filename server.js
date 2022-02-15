require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Connected to database successfully");
});

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const {
  getAllDogs,
  createDog,
  findDogById,
  findDogAndUpdate,
  deleteDog,
} = require("./db");
const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Dog CRUD Operations");
});

app.get("/all", async (req, res) => {
  try {
    const dogs = await getAllDogs();
    res.status(200).send({ message: "ALL OK", data: dogs });
  } catch (e) {
    res.status(500).send({ message: "ERROR", error: e });
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, gender, ownerName } = req.body;
    await createDog(name, gender, ownerName);
    res.status(201).send({ message: "ALL OK", data: "Data Added" });
  } catch (e) {
    res.status(500).send({ message: "ERROR", error: e });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await findDogById(id);
    res.status(200).send({ message: "ALL OK", data: dog });
  } catch (e) {
    res.status(500).send({ message: "ERROR", error: e });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, ownerName } = req.body;
    const dog = await findDogAndUpdate(id, { name, gender, ownerName });
    res.status(200).send({ message: "ALL OK", data: dog });
  } catch (e) {
    res.status(500).send({ message: "ERROR", error: e });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.query;
    await deleteDog(id);
    res.status(200).send({ message: "ALL OK", data: "Data deleted" });
  } catch (e) {
    res.status(500).send({ message: "ERROR", error: e });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Application Ready ⚡ on Port: ${process.env.PORT}`);
});
