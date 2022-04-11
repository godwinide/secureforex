const router = require("express").Router();

router.get("/", (req,res) => {
    try{
        return res.render("index", {pageTitle: "Welcome", req});
    }
    catch(err){
        return res.redirect("/");
    }
});

router.get("/about", (req,res) => {
    try{
        return res.render("about", {pageTitle: "About", req});
    }
    catch(err){
        return res.redirect("/");
    }
});

router.get("/terms", (req,res) => {
    try{
        return res.render("terms", {pageTitle: "Terms", req});
    }
    catch(err){
        return res.redirect("/");
    }
});

router.get("/faqs", (req,res) => {
    try{
        return res.render("faq", {pageTitle: "FAQS", req});
    }
    catch(err){
        return res.redirect("/");
    }
});

router.get("/contact", (req,res) => {
    try{
        return res.render("contact", {pageTitle: "Contact", req});
    }
    catch(err){
        return res.redirect("/");
    }
});

router.get("/affiliate_program", (req,res) => {
    try{
        return res.render("affiliate_program", {pageTitle: "Contact", req});
    }
    catch(err){
        return res.redirect("/");
    }
});

module.exports = router;