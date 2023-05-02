const express = require("express");
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

mongoose.connect(
    "mongodb+srv://drkspark:AlphA321@cluster0.iovairz.mongodb.net/FSWD"
);

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async function (req, res) {
    const newUser = new User();
    console.log(req.body);
    newUser.username = req.body.username;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    newUser.password = hash;
    newUser.age = req.body.age;
    newUser.mobile = req.body.mobile;

    let val = await newUser.save();
    if (val === undefined) {
        console.log(err);
    } else {
        console.log(res);
        res.redirect("login");
    }
});

app.post("/login", async function (req, res) {
    try {
        const docs = await User.findOne({ username: req.body.username });
        if (docs.username == req.body.username) {
            bcrypt.compare(
                req.body.password,
                docs.password,
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }

                    if (data) {
                        console.log(data);
                        res.send("Welcome");
                    } else {
                        res.send("Invalid Password");
                    }
                }
            );
        } else {
            res.redirect("register");
        }
    } catch (error) {
        consoe.log(err);
    }
});
// eruiadgkb

app.listen(3000, () => {
    console.log("App started on http://localhost:3000");
});
