const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./routes/auth.route.js');
const areaRouter = require('./routes/area.route.js')
const sweeperRoute = require('./routes/sweeper.route.js')
const complainRoute = require('./routes/complain.route.js')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch( (err) => {
    console.log(err);
} )

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRouter)
app.use('/api/area', areaRouter)
app.use('/api/sweeper', sweeperRoute)
app.use('/api/complain', complainRoute)

app.listen(5000, () => {
    console.log('Server is running on PORT 5000');
})


// npm run dev to run the backend