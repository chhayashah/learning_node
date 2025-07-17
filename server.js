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

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');
app.get('/', function (req, res) {
    res.send("hello world");
})

// post route to add a person
app.post('/person', async (req, res) => {
    try{
    const data = req.body;

    const newPerson = new Person(data);

    // newPerson.save((error, savedPerson) => {
    //     if (error) {
    //         console.log('error saving person:', error);
    //         res.status(500).json({error:'Internal server error'})
    //     } else {
    //         console.log('data saved successfully');
    //         res.status(200).json(savedPerson);
    //     }
    // })

    // save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/MenuItem', async (req, res) => {
    try {
        const data1 = req.body;
        const newMenu = new MenuItem(data1);
        const response1 = await newMenu.save();
        console.log("menu data saved");
        res.status(300).json(response1);
        
    } catch (err) {
        console.log(err);
        res.status(600).json({ error: 'Internal server error' });
    }
})

app.get("/person", async(req, res) =>{
    try {
        const data = await personalbar.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});