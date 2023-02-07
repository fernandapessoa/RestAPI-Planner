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
};

const signIn = (req, res) => {
    //console.log('chamado');
    const email = req.body.email;
    const password = req.body.password;
    // console.log('email:', email);
    // console.log('senha:', password);

    const loggedIn = usersData.find((user) => {
            if(user.email === email && user.password === password)
            return user;
            console.log(user)
        })
    
    console.log(loggedIn);
    if(loggedIn){
        return res.send('Logged User');
    }
    res.send('Incorrect user name or password.')
}

//USERS
app
    .route(`${baseRout}/users`)
    .get(getAllUsers);

app
    .route(`${baseRout}/users/signUp`)
    .post(newUser)

app
    .route(`${baseRout}/users/signIn`)
    .post(signIn)


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


//SERVER
const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });