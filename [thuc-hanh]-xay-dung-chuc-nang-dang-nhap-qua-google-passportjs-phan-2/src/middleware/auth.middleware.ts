const auth = {
    authCheck: undefined
};

auth.authCheck = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/login")
    }
}

export default auth;