const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// eslint-disable-next-line no-unused-vars
const cwd = process.cwd();

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API server is running on port ${PORT}!`);
  });
});
