const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const baseRout = "/api/v1";
var id = 0;

var usersData = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));

var eventsData = JSON.parse(fs.readFileSync(`${__dirname}/data/events.json`));

//USERS HANDLERS
const getAllUsers = (req, res) => {
  res.status(200).json(usersData);
};

const newUser = (req, res) => {
  const user = Object.assign(req.body);

  usersData.push(user);
  fs.writeFile(
    `${__dirname}/data/users.json`,
    JSON.stringify(usersData, null, "\t"),
    (err) => {
      res.status(201).json({
        status: "sucess",
        user,
      });
    }
  );
  console.log("Registrado");
};

const signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loggedIn = usersData.find((user) => {
    if (user.email === email && user.password === password) return true;
  });

  console.log(loggedIn);
  if (loggedIn) {
    return res.status(200).send("Logged User");
  }
  res.status(404).send("Incorrect user name or password.");
};

//EVENTS HANDLERS

const createEvent = (req, res) => {
  let newId;
  if (eventsData.length == 0) newId = '0';
  else newId = (eventsData[eventsData.length - 1].id * 1 + 1).toString();

  const week = {
    0: "sunday",
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  }
  
  let date = new Date(req.body.dateTime);
  let weekday = week[date.getDay()];

  const event = Object.assign(
    { id: newId },
    req.body,
    { weekday: weekday },
    { dateTime: date },
    { createdAt: Date() } 
  );

  eventsData.push(event);
  fs.writeFile(
    `${__dirname}/data/events.json`,
    JSON.stringify(eventsData, null, "\t"),
    (err) => {
      res.status(201).json({
        status: "sucess",
        data: {
          eventData: event,
        },
      });
    }
  );
};

const getEventById = (req, res) => {
  const id = req.params.id;
  eventsData.find((events) => {
    if (events.id === id) return res.status(200).json(events);
  });
  return res.status(404).end("ID not found");
};

const getEvent = (req, res) => {
  let events = [];
  if (req.query.dayOfTheWeek) //se existe um query param
  {
    const weekday = req.query["dayOfTheWeek"];
    eventsData.find((el) => {
      if (el.weekday === weekday) 
        events.push(el);
    });
  } 
  else events = eventsData;
 
  if (events.length>0) {
    return res.status(200).json(events);
  }

  return res.status(404).end("Event not found");
};


const deleteEventById = (req, res) => {
  const id = req.params.id;
  const length = eventsData.length;

  eventsData = eventsData.filter(function (el) {
    return  (el.id !== id);
  });

  if(!(length>eventsData.length))
    return res.status(404).end("Event id not found");

 
    fs.writeFile(`${__dirname}/data/events.json`,
    JSON.stringify(eventsData, null ,'\t'),
    (err) => {
      res.status(201).json({
        status: "sucess",
        event: null
      });
  })
}

const deleteEventByTheyOfWeek = (req, res) => {
    weekday = req.query.dayOfTheWeek;
    const length = eventsData.length;

    eventsData = eventsData.filter(function (el) {
        return  (el.weekday !== weekday);
    });
    
    if(!(length>eventsData.length))
        return res.status(404).end("Event id not found");
    
    fs.writeFile(`${__dirname}/data/events.json`,
    JSON.stringify(eventsData, null ,'\t'),
    (err) => {
        res.status(201).json({
        status: "sucess",
        event: null
        });
    })

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
  .get(getEvent)
  .post(createEvent)
  .delete(deleteEventByTheyOfWeek)

// app
//     .route(`${baseRout}/events/:dayOfWeek`)
//     .get(getEventByDayOfWeek);

app
  .route(`${baseRout}/events/:id`)
  .get(getEventById)
  .delete(deleteEventById);

//SERVER
const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
