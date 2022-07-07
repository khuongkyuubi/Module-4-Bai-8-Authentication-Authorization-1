import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";

export default passport;
import {userModel} from "../schemas/user/user.model";


// set up script for local Strategy
passport.use("local", new LocalStrategy(async (username, password, done) => {
    try {
        console.log(username)
        const user = await userModel.findOne({username: username});
        if (user) {
            if (user.password === password) {
                console.log("Login successful!");
                return done(null, user)
            } else {
                console.log("Wrong password");
                return done(null, false)
            }
        } else {
            console.log("User not found")
            return done(null, false)
        }
    } catch (e) {
        console.log(e.message)
    }
}));

// setup for GoogleStrategy,
// set up clientID, clietnSercret, callbackURL, sau khi xac minh xong nó sẽ trả về profile vào callback sau đấy
passport.use(new GoogleStrategy({
    clientID: "1074673168583-gnomkj3lqpug937gj3inpadjklv95dls.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({"google.id": profile.id});
        if (user) {
            return done(null, user)
        } else {
            // nếu chưa có user thì tạo ra và save to databse
            let newGoogleUser = new userModel({
                username: profile.emails[0].value,
                password: null,
                google: {
                    id: profile.id
                }
            })
            await newGoogleUser.save()
            return done(null, newGoogleUser)
        }

    } catch (e) {
        console.log(e.message);
        return done(e, false)
    }

}))


// After login , create session and cookie
passport.serializeUser((user, done) => {
    // user là biến hứng được từ bên passport.use Stragery ở trên
    done(null, user.id)
});

// Tại các lần truy cập lần sau, passport sẽ kiểm tra xem trong session có lưu giá trị đã cài ở trên không, nếu có thì xác minh là đã đăng nhập thành công

passport.deserializeUser(async (userID, done) => {
    const user = await userModel.findOne({_id: userID});
    if (user) {
        // Nếu tìm ra được user thì gắn nó vào trong req.user
        done(null, user);
    } else {
        console.log("User not found!")
    }
})
