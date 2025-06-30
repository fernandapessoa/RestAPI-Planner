const fs = require('fs');

const eventsJsonPath = `${__dirname}/../../seeds/events.json`;

var eventsData = JSON.parse(fs.readFileSync(eventsJsonPath));

//Validar se todos os parâmetros foram passados
exports.validEvent = (req, res, next) => {
  let invalidParam = [];
  if (!req.body.description) invalidParam.push(' description');
  if (!req.body.dateTime) invalidParam.push(' dateTime');

  if (invalidParam.length > 0)
    return res.status(400).json({
      status: 'failure',
      message: `Missing fields: ${invalidParam}`,
    });
  next();
};

//Validar se os parâmetros para dateTime são válidos
exports.ValidDateTime = (req, res, next) => {
  const { dateTime } = req.body;
  // Regex para YYYY/MM/DD
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;

  if (!regex.test(dateTime)) {
    return res.status(400).json({
      status: 'failure',
      message: `The dateTime format "${dateTime}" is not valid. Use format YYYY/MM/DD`,
    });
  }

  // Confirma que a data existe (evita datas como 2025/13/33)
  const [year, month, day] = dateTime.split('/').map(Number);
  const date = new Date(dateTime);
  if (date.getFullYear() !== year || (date.getMonth() + 1) !== month || date.getDate() !== day) {
    return res.status(400).json({
      status: 'failure',
      message: `The dateTime value "${dateTime}" is not a valid date.`,
    });
  }

  next();
};


//EVENTS HANDLERS
exports.createEvent = (req, res) => {
  let newId;
  if (eventsData.length == 0) newId = '0';
  else newId = (eventsData[eventsData.length - 1].id * 1 + 1).toString();

  const week = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };

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
    eventsJsonPath,
    JSON.stringify(eventsData, null, '\t'),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        data: {
          eventData: event,
        },
      });
    }
  );
};

exports.getEventById = (req, res) => {
  const id = req.params.id;
  eventsData.find((events) => {
    if (events.id === id) return res.status(200).json(events);
  });

  return res.status(404).json({
    status: 'failure',
    message: `ID ${id} not found`,
  });
};

exports.getEvent = (req, res) => {
  let events = [];
  let query = false;
  let weekday;

  if (req.query.dayOfTheWeek) {
    query = true;
    weekday = req.query['dayOfTheWeek'].toLowerCase();
    eventsData.find((el) => {
      if (el.weekday === weekday) events.push(el);
    });
  } else {
    events = eventsData;
  }

  if (events.length > 0) {
    return res.status(200).json(events);
  }

  if (query) {
    return res.status(404).json({
      message: `Event on ${weekday} not found`,
    });
  }

  return res.status(404).json({
    message: 'No event registered',
  });
};

exports.deleteEventById = (req, res) => {
  const id = req.params.id;
  const length = eventsData.length;

  eventsData = eventsData.filter(function (el) {
    return el.id !== id;
  });

  if (!(length > eventsData.length))
    return res.status(404).json({
      status: 'failure',
      message: `Event id ${id} not found`,
    });

  fs.writeFile(
    eventsJsonPath,
    JSON.stringify(eventsData, null, '\t'),
    (err) => {
      res.status(202).json({
        status: 'sucess',
        message: `Event id: ${id} - deleted`,
      });
    }
  );
};

exports.deleteEventByDayOfWeek = (req, res) => {
  weekday = req.query.dayOfTheWeek.toLowerCase();
  const length = eventsData.length;

  eventsData = eventsData.filter(function (el) {
    return el.weekday !== weekday;
  });

  if (!(length > eventsData.length))
    return res.status(404).json({
      status: 'failure',
      message: `Event on ${weekday} not found`,
    });

  fs.writeFile(
    eventsJsonPath,
    JSON.stringify(eventsData, null, '\t'),
    (err) => {
      res.status(202).json({
        status: 'sucess',
        event: null,
      });
    }
  );
};
