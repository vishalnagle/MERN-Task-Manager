const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const expressValidator = require('express-validator');
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(cors());

//routes middleware
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// db connection
mongoose.connect(mongoString, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})