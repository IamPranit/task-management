import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
import { jwtAuthenticate } from "../middleware/jwtAuth.js";
const router = express.Router();

router.route("/").post(createUser);
router.get("/:id", jwtAuthenticate, getUser);

export default router;
