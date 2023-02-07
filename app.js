const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const baseRout =  '/api/v1';

const usersData = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`)
);
// const eventsData = JSON.parse(
//     fs.readFileSync(`./data/events.json`)
// );


const getAllUsers = (req, res) => {
    res.status(200).json(
        usersData)
};

const newUser = (req, res) => {
    const user = Object.assign(req.body);
    
    usersData.push(user);
    fs.writeFile(
        `${__dirname}/data/users.json`,
        JSON.stringify(usersData),
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
}

//USERS
app
    .route(`${baseRout}/users`)
    .get(getAllUsers);


app
    .route(`${baseRout}/users/signUp`)
    .post(newUser)

// app
//     .route(`${baseRout}/users/signIn`)
//     .post()


// //EVENTS
// app
//     .route(`${baseRout}/events`)
//     .get(getAllEvents)
//     .post(createEvent)

// app 
//     .route(`${baseRout}/events/:dayOfWeek`)
//     .get(getEventByDay)

// app 
//     .route(`${baseRout}/events/:id`)
//     .get(getEventById)



const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });