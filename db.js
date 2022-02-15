const mongoose = require("mongoose");
const { DogModel } = require("./schema");

const getAllDogs = async () => {
  const dogs = await DogModel.find({});
  return dogs;
};

const createDog = async (name, gender, ownerName) => {
  const dog = new DogModel({
    name,
    gender,
    ownerName,
  });
  await dog.save();
};

const findDogById = async (id) => {
  const dog = await DogModel.findById(id);
  return dog;
};

const findDogAndUpdate = async (id, { name, gender, ownerName }) => {
  const dog = await findDogById(id);
  if (name) dog.name = name;
  if (gender) dog.gender = gender;
  if (ownerName) dog.ownerName = ownerName;
  await dog.save();
  return dog;
};

const deleteDog = async (id) => {
  await DogModel.deleteOne(id);
};

module.exports = {
  getAllDogs,
  createDog,
  findDogById,
  findDogAndUpdate,
  deleteDog,
};
