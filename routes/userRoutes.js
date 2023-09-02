const express = require("express");
const userRouter = express.Router();
const {authMiddleware} = require("../middlewares/validateTokenHandler");
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    refreshToken,
    logoutUser} = require("../controllers/userController");

userRouter.route("/all").get(authMiddleware,getUsers);
userRouter.route("/:id").get(getUser);
userRouter.route("/add").post(createUser);
userRouter.route("/:id").put(updateUser);
userRouter.route("/:id").delete(deleteUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/refresh").post(refreshToken);
userRouter.route("/logout").post(logoutUser);

module.exports = userRouter