import upload from "../config/multer.js";
import express from "express";
import usersController from "../controllers/usersController.js";

const router = express();


router.get("/api/users", usersController.getAll);
router.get("/api/users/:id", usersController.getById);
router.post("/api/users", upload.single("avatar"),usersController.create);
router.patch("/api/users/:id", usersController.update);
router.delete("/api/users/:id", usersController.destroy);


export default  router;