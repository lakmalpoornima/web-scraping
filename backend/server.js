const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileSubmitRoutes = require('./routes/fileSubmit');
const items = require('./routes/item')
const user = require('./routes/user')

const app = express();
const port = process.env.PORT || 4000;

// MongoDB connection URL (replace with your MongoDB Atlas connection string)
const dbUri = 'mongodb+srv://web:123@cluster0.3lj3zei.mongodb.net/';

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(dbUri)

  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas: ', err);
  });

  app.use('/filesubmit', fileSubmitRoutes);
  app.use('/items', items);
  app.use('/user', user);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
