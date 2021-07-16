# Social-App-Apollo-Graphql

This repo contains the full MERN-Graphql App made using Apollo server on backend and Apollo Client with React on Frontend. It was build my me to practice my GraphQL and Apollo Serve and Client skills.

## Running the Project

Clone the repo and then install dependencies for both the client and server. For this make sure you have Node.js installed.

For Server:  
Make a config.js file and add following:

```js
module.exports = {
  MONGODB: <link to your mongoDb>,
  JWT_SECRET: <jwt secret>,
}
```

After that run following commands

```bash
cd server
npm i
npm serve
```

For Client:

```bash
cd client
npm i
npm start
```

After all this the app should be running. Visit the link given by client to test the App.
