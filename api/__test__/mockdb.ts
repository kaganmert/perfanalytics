import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
// https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np

const mongod = new MongoMemoryServer();

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
