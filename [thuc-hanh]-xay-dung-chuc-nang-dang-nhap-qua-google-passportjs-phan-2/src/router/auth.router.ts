import express from "express";
import userModel from "../models/user.model"
import passport from "../middleware/passport.middeware";
import multer from "multer";

const upload = multer()

const router = express.Router();
export default router;

// [GET] /login
router.get("/", (req, res, next) => {
    res.render("login/login")
});

// [POST] /login
router.post("/", passport.authenticate("local", {failureRedirect: "/login", successRedirect: "/"}))


