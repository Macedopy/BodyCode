import { Router } from "express";
import { getUser } from "./CrmController";

const router = Router();

router.get("/users", getUser);
// router.get("/users/:id", UserController.getUserById)

// router.post("/users", UserController.postUser)

// router.delete("/users/:id", UserController.deleteUser)

// router.patch("/users/:id", UserController.updateUser)

export default router;