import userModel from "../models/user.model"
import passport from "passport";
import LocalStrategy from "passport-local";

// Thiết lập kịch bản xác minh , xác thực login tại đây


// Thiết lập xử dụng phương thức xác thực local
passport.use("local", new LocalStrategy(async (username, password, done) => {
    try {
        let user = await userModel.findOne({username: username});
        if (user) {
            if (password === user.password) {
                return done(null, user);
            } else {
                console.log("Wrong password!")
                return done(null, false)
            }

        } else {
            console.log("User not found!")
            return done(null, false)
        }

    } catch (e) {
        console.log(e.message);
    }

}));


// Thiết lập để passport set cookie - sesson sau khi đăng nhập
passport.serializeUser((user, done) => {
    // lưu dữ liệu của user vào trong session và cookie (ném userID vào session)
    // dữ liệu có thể tra cứu trong req.session.passport.user
    // hàm này sẽ tự sinh ra cookie lưu sesion id
    done(null, user._id) // sau kho done thì ghi thông tin user vào cookie


})

// Thiết lập để pasport lấy ra thông tin user mỗi lần gửi request dau khi đăng nhập
passport.deserializeUser(async (userId, done) => {
    // hàm này sẽ lấy giá trị mà mình lưu trong session (userId) lấy ở bên serializeUser
    try {
        let user = await userModel.findOne({_id: userId});
        if (user) {
            // gắn user vào trong req.user
            done(null, user)
        } else {
            console.log("You are not authenticated")
        }
    } catch (e) {
        console.log(e.message)
    }
})

export default passport;