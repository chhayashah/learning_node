// function add(a, b) {
//     return a + b;
// }
// var add = function (a, b) {
//     return a + b;
// }

// var add = (a,b) => {return a+b}

// var add = (a, b) => a + b;

// var result = add(2, 7);
// console.log(result);

// (function () {
//     console.log("chhaya");
// })();

// function callback() {
//     console.log('now adding is successful complete');
// }

// const add = function (a, b, callback) {
//     var result = a + b;
//     console.log('result: ' + result);
//     callback();
// }
// add(3, 4, callback);

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi' + user.username + '!\n', () => {
//     console.log('file is created');
// });

// const notes = require('./notes.js');
// console.log('server file is available');

// var age = notes.age;
// console.log(age);

const express = require('express')

const app = express();
const db = require('./db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const Person = require('./models/person');
// const MenuItem = require('./models/MenuItem');

// middleware function
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest); //middleware


passwport.use(new LocalStrategy(async (USERNAME, passport, done) => {
    // authentication logic
    try {
        console.log('Received credentials:', USERNAME, passport);
        const user =await Person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const isPassportMatch = user.passport === passport ? true : false;
        if (isPassportMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect passport.' });
        }
    } catch (err) {
        return done(err);
    }
}))

const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',localAuthMiddleware, function (req, res) {
    res.send("hello world");
})




// import the router files
const personRoutes = require('./routes/personRoutes');
const menuroutes = require('./routes/menuroutes');
app.use('/person', personRoutes);
app.use('/menu', menuroutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
});