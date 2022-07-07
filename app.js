//jshint esversion:6

// Allow for environment variables to be placed in the .env file
require("dotenv").config();
// use https instead of request = require("request");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { reset } = require("nodemon");

const app = express();
// Allow parsing of webpage for elements
app.use(bodyParser.urlencoded({ extended: true }));

// Allow static CSS and Image file access under public folder
app.use(express.static("public"));

// Serve signup webpage
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// POST data from form to MailCHimp API
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // Subscriber info from signup form to be posted to MailChimp API as a JavaScript object.
  const data = {
    members: [
      /* array of key value pairs (member data) */
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          /* object */ FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  // Convert subscriber info object to a string
  const jsonData = JSON.stringify(data);

  const url = process.env.MAILCHIMP_URL;
  console.log(url);

  const options = {
    /* Javascript Object */ method: "POST",
    auth: process.env.API_KEY,
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      console.log(response.statusCode);
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData); /* Sending data to Mailchimp */
  request.end(); /* Ending communication with mailchimp */
});

// Redirects failure retry button to the signup webpage
app.post("/failure", function (req, res) {
  res.redirect("/");
});

// Allows Heroku dynamic port to be used or the local port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port 3000");
});
