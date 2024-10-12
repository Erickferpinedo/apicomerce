import bcrypt from "bcryptjs"
import User from "../models/User.js";




async function getAll(req, res) {
    try {
      const users = await User.find({ deletedAt: null });
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(404).json("Usuarios no encontrados");
    }
  }
  
  async function getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(404).json("Usuario no encontrado");
    }
  }
  
  async function create(req, res) {
    try {
      const { firstName, lastName, email, password,address, age } = req.body;
      const avatar = req.file.filename;
  
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        address,
        age,
        avatar,
      });
  
      return res.status(201).json("User created!");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  }
  
  async function update(req, res) {
    const userToUpdate = await User.findById(req.params.id);
  
    if (userToUpdate !== null) {
      const { name, email, password, address, phone} = req.body;
  
      userToUpdate.name = name || userToUpdate.name;
      userToUpdate.email = email || userToUpdate.email;
      userToUpdate.password = password || userToUpdate.password;
      userToUpdate.address = address || userToUpdate.address;
      userToUpdate.phone = phone || userToUpdate.phone;
  
      await userToUpdate.save();
  
      return res.json("El usuario ha sifo actualizo");
    } else {
      return res.json("No existe usuario con el ID mencionado");
    }
  }
  
  async function destroy(req, res) {
    const userDelete = await User.findById(req.params.id);
  
    userDelete.deletedAt = Date.now();
    userDelete.save();
  
    return res.json("El user se ha eliminado");
  }
  
  export default {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    destroy: destroy,
  };