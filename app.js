const express = require('express');
const app = express();
const path = require('path');

const passport = require('passport');

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
// routes
const users = require('./routes/api/users');
const User = require('./models/User');
const tweets = require('./routes/api/tweets');

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch((err) => console.log(err));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/models/User', User);
app.use('/api/tweets', tweets);

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}
app.listen(port, () => console.log(`Server is running on port ${port}`));
