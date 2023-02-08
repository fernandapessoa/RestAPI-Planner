const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const baseRout =  '/api/v1';
var id = 0;

const usersData = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`)
);

const eventsData = JSON.parse(
    fs.readFileSync(`${__dirname}/data/events.json`)
);
console.log('eventsData:', eventsData.length);



//USERS HANDLERS
const getAllUsers = (req, res) => {
    res.status(200).json(usersData)
};

const newUser = (req, res) => {
    const user = Object.assign(req.body);
    
    usersData.push(user);
    fs.writeFile(
        `${__dirname}/data/users.json`,
        JSON.stringify(usersData, null,'\t'),
        err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    usersData: user
                }
            });
        }
    );
    console.log('Registrado');
};

const signIn = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const loggedIn = usersData.find((user) => {
        if(user.email === email && user.password === password)
            return true;
    });
    
    console.log(loggedIn);
    if(loggedIn){
        return res.status(200).send('Logged User');
    }
    res.status(404).send('Incorrect user name or password.');
}


//EVENTS HANDLERS

const getAllEvents = (req, res) => {
    res.status(200).json(eventsData)
};


const createEvent =  (req, res) => {
    //console.log(eventsData.lenght());
    let newId;
    if(eventsData.length == 0){
        newId = 0;
    }
    else{
        newId = eventsData[eventsData.length-1].id + 1;
    }

    const event = Object.assign( {id: newId}, req.body, {createdAt: Date()});
    
    
    eventsData.push(event);
    fs.writeFile(
        `${__dirname}/data/events.json`,
        JSON.stringify(eventsData, null,'\t'),
        err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    eventData: event
                }
            });
        }
    );
    console.log('Event registrated');
};










//USERS
app
    .route(`${baseRout}/users`)
    .get(getAllUsers);

app
    .route(`${baseRout}/users/signUp`)
    .post(newUser);

app
    .route(`${baseRout}/users/signIn`)
    .post(signIn);


// //EVENTS
app
    .route(`${baseRout}/events`)
    .get(getAllEvents)
    .post(createEvent)

// app 
//     .route(`${baseRout}/events/:dayOfWeek`)
//     .get(getEventByDay)

// app 
//     .route(`${baseRout}/events/:id`)
//     .get(getEventById)


//SERVER
const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });