# Newsletter is a Node.js application that uses 3 webpages (signup, success, failure) and a node.js backend to allow users to subscribe to a newsletter. The newsletter signup form utilizes a method=post action to send the subscriber's information to a Mailchimp marketing list via the Mailchimp API. If the post is successful, then the user is redicted to the success webpage. if the post is unsuccessful it will redirect to the failure webpage and console.log the status.

## For this project you will need a node.js backend running. You will also need free Heroku and Mailchimp accounts as well as a Mailchipm API key. Hide environment variables like your API key and url/list_id

- Rename `.env.sample` to `.env`
- Create a free account and generate an API key at https://mailchimp.com
- Add your API key, and URL, to the `.env`
- Make sure to add your `.env` file to your `.gitignore` file to ensure your API key is not uploaded to Github or Mailchimp will invalidate your API key due to being published on a public site.

### Install dependencies

```
npm install dotenv, https, express, body-parser, nodemon, heroku cli, @mailchimp/mailchimp_marketing
```

### Launch the backend

```
nodemon app.js
```

### App port listening to Heroku Dynamic or local 3000

```
app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port 3000");
});
```

### Heroku needs a Procfile which identifies the service to host the app. The instructions are placed on the first line inside the file named 'Procfile'

```
web: node app.js
```
