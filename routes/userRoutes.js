const express = require("express");
const userRouter = express.Router();
const {getUsers,getUser,createUser,updateUser,deleteUser} = require("../controllers/userController");

userRouter.route("/all").get(getUsers);
userRouter.route("/:id").get(getUser);
userRouter.route("/add").post(createUser);
userRouter.route("/:id").put(updateUser);
userRouter.route("/:id").delete(deleteUser);

module.exports = userRouter