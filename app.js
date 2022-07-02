//jshint esversion:6
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
// use https instead of request = require("request");
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

  // Subscriber info from form to post to MailChimp API as a JavaScript object.
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

  // Convert subscriber info to a string
  const jsonData = JSON.stringify(data);

  // MailChimp listId = "a8bd2750da";
  const url = "https://us9.api.mailchimp.com/3.0/lists/a8bd2750da";

  const options = {
    /* Javascript Object */ method: "POST",
    auth: "Ayren Lytle:95a8b96ddb204963391ec2d3186f4688-us9",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      reset.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData); /* Sending dat to Mailchimp */
  request.end(); /* Ending communication with mailchimp */
});

// Redirects failure retry button to the signup webpage
app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port 3000");
});