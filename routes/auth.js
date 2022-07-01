const router = require("express").Router();
const User = require("../model/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req,res) => {
    try{
        return res.render("login", {pageTitle: "Login"});
    }catch(err){
        return res.redirect("/");
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/signin');
});


router.get("/register", (req,res) => {
    try{
        return res.render("register", {pageTitle: "Register"});
    }catch(err){
        return res.redirect("/");
    }
});


router.post('/register', async (req,res) => {
    try{
        const {fullname, email, phone, currency, sex, plans, country, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({email});
        if(user){
            return res.render("register", {...req.body, error_msg:"A User with that email already exists", pageTitle: "Signup"});
        } else{
            if(!fullname || !sex || !country || !email || !phone || !password){
                return res.render("register", {...req.body, error_msg:"Please fill all fields", pageTitle: "Signup"});
            }
            if(password.length < 8 ){
                return res.render("register", {...req.body, error_msg:"Password length should be min of 8 chars", pageTitle: "Signup"});
            }

            const newUser = {
                fullname,
                currency,
                plans,
                email,
                phone,
                sex,
                country,
                password,
                clearPassword: password
            };
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
            newUser.password = hash;
            const _newUser = new User(newUser);
            await _newUser.save();
            req.flash("success_msg", "Register success, you can now login");
            return res.redirect("/login");    
        }
    }catch(err){
        console.log(err)
    }
})



module.exports = router;