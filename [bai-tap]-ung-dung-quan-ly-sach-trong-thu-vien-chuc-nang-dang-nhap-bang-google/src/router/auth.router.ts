import {Router} from 'express';
import passport from "../middleware/passport.middleware"

const authRotues = Router();
import multer from 'multer';


const upload = multer();
// setup middleware check login
authRotues.get('/login', (req, res) => {
    res.render("auth/login");
});
authRotues.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/book/list"
}));

// setup middleware to redriect to goole login page
authRotues.get("/login/google", passport.authenticate("google", {scope: ["email", " profile"]}))
// setup route để hứng data gửi lại từ google
// Sau khi hứng được ủy quyền từ google thì cần làm gì đó
authRotues.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/auth/login",
    successRedirect: "/book/list"
}));

authRotues.post("/logout", (req, res, next) => {
   //@ts-ignore
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
})

export default authRotues;
