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
                user
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
    let newId;
    if(eventsData.length == 0) newId = 0;
    else newId = eventsData[eventsData.length-1].id + 1;
    
    let date = new Date(req.body.dateTime);
    let week = date.getDay();
    
    switch(week){
        case 1:
            week = 'sunday';
            break;
        case 2:
            week = 'monday';
            break;
        case 3:
            week = 'tuesday';
            break;
        case 4:
            week = 'wednesday';
            break;
        case 5:
            week = 'thursday';
            break;
        case 6:
            week = 'friday';
            break;
        case 7:
            week = 'saturday';
            break;
    }

    const event = Object.assign( {id: newId}, req.body,{week: week}, {dateTime: date}, {createdAt: Date()});
    
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
};


const getEventById =  (req, res) => {
    const id = req.params.id * 1;
    const event = eventsData.find((events) => {
        if(events.id === id)
            return true;
    });
    if(event){
        return res.status(200).json(event);
    }
    else return res.status(404).end("ID not found");
};

const getEventByDayOfWeek = (req, res) => {
    const week = req.params.dayOfWeek;
    let events = []

    eventsData.find((el) => {
        if(el.week === week)
            events.push(el);
    });

    if(events){
        return res.status(200).json(events);
    }
    else return res.status(404).end("Event not found");
}

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
    .post(createEvent);

app 
    .route(`${baseRout}/events/:dayOfWeek`)
    .get(getEventByDayOfWeek);

app 
    .route(`${baseRout}/events/:id`)
    .get(getEventById);


//SERVER
const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });