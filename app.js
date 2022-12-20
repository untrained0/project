// Api Id
// 7cbfd3904415810b16506d56548b4cf4-us21

// list Id
// 3d7073b998



const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const async = require('async');
const https  = require("https");

require('dotenv').config();
// const { log } = require("console");
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
// console.log(process.env);
mailchimp.setConfig({
    apiKey : process.env.API_KEY,
    server : "us21",
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const LastName = req.body.lname;
    const Email = req.body.email;
    const listId = "3d7073b998";

    async function run(){
        try{
            const response = await mailchimp.lists.addListMember(listId, {
                email_address : Email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : LastName
                }
            })
            res.sendFile(__dirname + "/success.html");
            console.log("success");
        }
        catch(error){
            console.log(error);
            res.sendFile(__dirname + "/failure.html");
        }
    }
    run();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(port, function(){
    console.log("the server is running on port 3000!");
})
