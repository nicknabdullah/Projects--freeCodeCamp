const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('public'))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// create schemas for user, excercise and log
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const exerciseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const logSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: { type: Number, default: 0 },
  log: [{ description: String, duration: Number, date: Date }]
});

// Define User, Exercise, and Log model once at the top of your file
const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
const Log = mongoose.model('Log', logSchema);

// Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Helper to validate yyyy-mm-dd and check if it's a real date
// otherwise, return current date
function parseValidDate(dateStr) {
  if (typeof dateStr !== 'string')
    return new Date();
  dateStr = dateStr.trim();

  // Regex for yyyy-mm-dd
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr))
    return new Date();

  const date = new Date(dateStr);

  // Check for invalid date
  if (isNaN(date.getTime()))
    return new Date();
  return date;
}

// Route to handle:
// GET all users
// POST a new user 
app.route('/api/users')
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    try {
      // Create and save new user
      const newUser = new User({ username });
      const savedUser = await newUser.save();
      res.status(201).json({
        username: savedUser.username,
        _id: savedUser._id
      });
    } catch (err) {
      console.error('Error saving user:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

// POST a new exercise
app.post('/api/users/:_id/exercises', async (req, res) => {
  const _id = req.params._id;
  const { description, duration, date } = req.body;

  if (!description || !duration) {
    return res.status(400).json({ error: 'Description and duration are required' });
  }

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate date
    const exerciseDate = parseValidDate(date);

    const newExercise = new Exercise({
      username: user.username,
      description,
      duration,
      date: exerciseDate
    });

    await newExercise.save();

    res.json({
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: exerciseDate.toDateString(),
      _id: user._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// GET user log
app.get('/api/users/:_id/logs', async (req, res) => {
  const _id = req.params._id;
  let { from, to, limit } = req.query;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const exerciseQuery = { username: user.username };
    const dateFilter = {};

    // Validate 'from' and 'to' dates
    const fromDate = parseValidDate(from);
    const toDate = parseValidDate(to);

    if (from) {
      dateFilter.$gte = fromDate;
    }
    if (to) {
      dateFilter.$lte = toDate;
    }
    if (from || to) {
      exerciseQuery.date = dateFilter;
    }

    let exercises = await Exercise.find(exerciseQuery);

    if (limit) {
      exercises = exercises.slice(0, parseInt(limit));
    }

    const logs = exercises.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date instanceof Date && !isNaN(ex.date) ? ex.date.toDateString() : ""
    }));

    res.json({
      _id: user._id,
      username: user.username,
      count: logs.length,
      log: logs
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})