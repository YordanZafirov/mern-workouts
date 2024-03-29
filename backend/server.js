require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

const port = process.env.PORT || 4000

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors())

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');
    // listen to port
    app.listen(port, () => {
      console.log('listening on port', port);
    })
  })
  .catch((err) => {
    console.log(err);
  }) 