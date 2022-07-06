import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./src/middleware/auth.middleware"

dotenv.config();
import connectDB from "./src/config/db"
import passport from "./src/middleware/passport.middeware";
import session from "express-session";

import bookRoutes from './src/router/book.router';
import loginRouter from "./src/router/login.router";

const PORT = process.env.PORT || 4000;
const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');
// connect to DB
connectDB().catch(() => console.log("connectDB error!"))
// setup parser
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60*1000
    }
}))

// setup passport init
app.use(passport.initialize()); // to init passport
app.use(passport.session()); // to using session on server, must use express-session first

app.get("/",auth.authCheck, (req, res, next) => {
    res.json({message: "Welcome to my application!"});
})
app.use('/book',auth.authCheck, bookRoutes);

app.use("/login", loginRouter)

app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})
