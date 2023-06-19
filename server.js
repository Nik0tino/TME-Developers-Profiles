//Packages definer
const express = require("express");
const app = express();
const ejs = require("ejs");
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const urlocaldb = require("urlocaldb");
const db = new urlocaldb("devdatabase");
//Express & Ejs Loader
app.listen(port, () => {
    console.log(`App Listining On Port : ${port}`)
})

app.set("view engine", "ejs")
app.use(express.static("public"))


app.get("/", (req, res) => {
    res.render("main")
})


app.get("/create", (req, res) => {
    const developers = db.get("developers") || []
    res.render("create", { developers: developers })
})
app.get("/Author", (req,res) => {
    res.redirect("https://portfolio.bilalchentouf3.repl.co/")
})
app.post("/create", function (req, res) {
    const name = req.body.name;
    const age = req.body.age;
    const skills = req.body.skills;
    const country = req.body.country;
    const city = req.body.city;

    let developers = db.get("developers") || []

    const developer = {
        name: name,
        age: age,
        skills: skills,
        country: country,
        city: city
    }

    developers.push(developer)

    db.set("developers", developers)
    res.send("Your Infomations Added Succesfully")
})

app.get("/discord", (req, res) => {
    res.redirect("https://discord.gg/3wJa57h3")
})

app.get("/developers", (req, res) => {
    let developers = db.get("developers")
    const developer = developers
    res.render("developer", {
        developer: developer
    })
})



