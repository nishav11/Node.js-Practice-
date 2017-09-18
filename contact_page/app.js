var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use("/assets", express.static("assets"));

app.get("/", function(req, res, next) {
    res.render("index");
});

app.get("/contact", function(req, res, next) {
    res.render("contact", { qs: req.query });
});
app.post("/contact", urlencodedParser, function(req, res, next) {
    // console.log(req.body);
    res.render("contact-success", { data: req.body });
});


app.get("/profile/:name", function(req, res, next) {
    var data = { age: 26, job: "Front-end Developer", hobbies: ['singing', 'reading', 'coding'] };
    res.render("profile", { person: req.params.name, data: data });
});



app.listen(3000);