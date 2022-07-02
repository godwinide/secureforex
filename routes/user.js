const router = require("express").Router();
const {ensureAuthenticated} = require("../config/auth");
const User = require("../model/User");
const History = require("../model/History");
const sendEmail = require("../tools/sendEmail");

router.get("/dashboard", ensureAuthenticated, (req,res) => {
    try{
       if(req.user.upgraded){
        return res.render("dashboard", {pageTitle: "Dashbaord", layout: 'layout2', req});
       }else{
        return res.render("dashboard2", {pageTitle: "Dashbaord", layout: 'layout2', req});
       }
    }catch(err){
        return res.redirect("/dashboard2");
    }
});

router.get("/investment", ensureAuthenticated, (req,res) => {
    try{
        return res.render("investment", {pageTitle: "Investment", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/addInvestment", ensureAuthenticated, (req,res) => {
    try{
        return res.render("addInvestment", {pageTitle: "add Investment", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.post("/addInvestment", ensureAuthenticated, async (req,res) => {
    try{
        const {amount, duration} = req.body;
        if(!amount || !duration){
            req.flash("error_msg", "Please enter the amount and duration");
            return res.redirect("/addInvestment");
        }
        const d = new Date();
        await User.updateOne({_id: req.user.id}, {
            investments:[
                ...req.user.investments,
                {
                    amount,
                    duration,
                    status: "in progress",
                    date: new Date(),
                    expiry: new Date(d.setDate(d.getDate() + 1))

                }
            ]
        })
        req.flash("success_msg", "Successful");
        res.redirect("/investment");
    }catch(err){
        console.log(err)
        return res.redirect("/dashboard");
    }
});

router.get("/topup", ensureAuthenticated, (req,res) => {
    try{
        return res.render("topup", {pageTitle: "Topup", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/confirm-topup", ensureAuthenticated, (req,res) => {
    try{
        return res.render("confirm-topup", {pageTitle: "Confirm Topup", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.post("/confirm-topup", ensureAuthenticated, async (req,res) => {
    try{
        const {amount} = req.body;
        if(!amount){
            req.flash("error_msg", "please enter the amount you deposited");
            return res.redirect("confirm-topup");
        }
        const newHist = new History({
            amount,
            userID: req.user.id,
            method: "bank transfer",
            type: "deposit"
        });
        await newHist.save();
        req.flash("success_msg", "Proof of payment submitted successfully");
        return res.redirect("confirm-topup");
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/deposit_history", ensureAuthenticated, async(req,res) => {
    try{
        const history = await History.find({userID: req.user.id, type: "deposit"});
        return res.render("history", {pageTitle: "Hisotry", layout: 'layout2', history, req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/withdraw", ensureAuthenticated, async (req,res) => {
    try{
        const history = await History.find({userID: req.user.id, type: 'withdraw'});
        return res.render("withdrawal", {pageTitle: "Withdraw", layout: 'layout2', history, req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/withdrawal_settings", ensureAuthenticated, (req,res) => {
    try{
        return res.render("withdrawal_settings", {pageTitle: "Withdraw Settings", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.post("/withdrawal_settings", ensureAuthenticated, async (req,res) => {
    try{
        const {method} = req.body;
        const pDetails = req.body;
        await User.updateOne({_id: req.user.id}, {
            [method]: {
                ...req.body
            }
        });
        req.flash("success_msg", "Payment method updated");
        res.redirect("withdrawal_settings");
    }catch(err){
        console.log(err)
        return res.redirect("/dashboard");
    }
});

router.get("/make-withdraw", ensureAuthenticated, (req,res) => {
    try{
        return res.render("make-withdraw", {pageTitle: "Withdraw", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.post("/make-withdraw", ensureAuthenticated, async (req,res) => {
    try{
        const {amount, method, pin} = req.body;
        if(!method){
            req.flash("error_msg", "the method field is required");
            return res.redirect("/make-withdraw");
        }
        if(!pin){
            req.flash("error_msg", "Please enter your withdrawal token pin");
            return res.redirect("/make-withdraw");
        }
        if(!amount){
            req.flash("error_msg", "please enter amount to withdraw");
            return res.redirect("/make-withdraw");
        }
        if(amount > req.user.balance || amount < 1){
            req.flash("error_msg", "insufficient funds");
            return res.redirect("/make-withdraw");
        }
        if(pin !== req.user.pin){
            req.flash("error_msg", "You have entered an incorrect token pin");
            return res.redirect("/make-withdraw");
        }
        const newHist = new History({
            amount,
            userID: req.user.id,
            user: req.user,
            method: req.user[method],
            type: "withdraw"
        });
        await newHist.save();
        await User.updateOne({_id: req.user.id}, {
            balance: req.user.balance - amount,
            total_withdraw: Number(req.user.total_withdraw) + Number(amount)
        });
        sendEmail(amount, req.user.email)
        req.flash("success_msg", "Withdrawal request submitted successfully");
        return res.redirect("/withdraw");
    }catch(err){
        console.log(err)
        return res.redirect("/dashboard");
    }
});


router.get("/upgrade", ensureAuthenticated, (req,res) => {
    try{
        return res.render("upgrade", {pageTitle: "Hisotry", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/upgrade/:name", ensureAuthenticated, async (req,res) => { 
    try{
        const {name} = req.params;
        const tiers = ["silver", "gold", "platinum", "diamond"];
        if(tiers.includes(name)){
            await User.updateOne({_id: req.user.id}, {
                account_type: name
            });
            req.flash("success_msg", "Account upgraded request submitted, contact support for more info");
            return res.redirect("/upgrade");
        }
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/trade_returns", ensureAuthenticated, (req,res) => {
    try{
        return res.render("returns", {pageTitle: "Hisotry", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/message", ensureAuthenticated, (req,res) => {
    try{
        return res.render("message", {pageTitle: "Hisotry", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/profile", ensureAuthenticated, (req,res) => {
    try{
        return res.render("profile", {pageTitle: "User Profile", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

router.get("/support", ensureAuthenticated, (req,res) => {
    try{
        return res.render("customer_support", {pageTitle: "Hisotry", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/dashboard");
    }
});

module.exports = router;