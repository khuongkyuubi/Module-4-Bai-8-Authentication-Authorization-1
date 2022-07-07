import {Router} from 'express';
import passport from "../middleware/passport.middleware"

const authRotues = Router();
import multer from 'multer';


const upload = multer();

authRotues.get('/login', (req, res) => {
    res.render("auth/login");
});
authRotues.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/book/list"
}))

export default authRotues;
