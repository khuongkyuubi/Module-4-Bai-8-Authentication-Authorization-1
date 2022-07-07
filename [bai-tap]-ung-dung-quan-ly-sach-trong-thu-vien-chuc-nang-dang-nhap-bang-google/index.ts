import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import bookRoutes from './src/router/book.router';
import authRotues from './src/router/auth.router';

import passport from './src/middleware/passport.middleware';
import session from 'express-session';
import auth from "./src/middleware/auth.middleware";


const PORT = 3000;
const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');

const DB_URL = `mongodb://localhost:27017/dbTest`;
mongoose.connect(DB_URL)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

// Setup passport
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/book', auth.authCheck, bookRoutes);
app.use('/auth', authRotues);

app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})
