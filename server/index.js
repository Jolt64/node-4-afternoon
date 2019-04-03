require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSessions = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')

const app = express();

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365
        }
    })
);
app.use(checkForSessions);

app.get('/api/swag', swagController.read);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser)


app.listen(SERVER_PORT, console.log(`${SERVER_PORT} people running the race`));
