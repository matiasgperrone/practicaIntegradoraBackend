import mongoose from "mongoose";

export const init = async () => {
  try {
    const URI =
      "mongodb+srv://developer:matiasgermanperrone@cluster0.gxwsojd.mongodb.net/";
    mongoose.connect(URI);
    console.log("Base de datos conectada 😎");
  } catch (error) {
    console.log("Error al intentar conectar a DB 😢", error.message);
  }
};
// 1.22
