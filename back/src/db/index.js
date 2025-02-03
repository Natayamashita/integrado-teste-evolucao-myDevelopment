import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/teste-evolucao-collection", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));
const db = mongoose;

export default db;