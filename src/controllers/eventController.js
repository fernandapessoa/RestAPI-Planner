const fs = require("fs");
var eventsData = JSON.parse(fs.readFileSync(`${__dirname}/../../seeds/events.json`));


//EVENTS HANDLERS

exports.createEvent = (req, res) => {
  let newId;
  //criando um ID para o evento
  if (eventsData.length == 0) newId = "0";
  else newId = (eventsData[eventsData.length - 1].id * 1 + 1).toString();

  //definindo o dia da semana
  const week = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };

  let date = new Date(req.body.dateTime);
  let weekday = week[date.getDay()];

  //criando o evento
  const event = Object.assign(
    { id: newId },
    req.body,
    { weekday: weekday },
    { dateTime: date },
    { createdAt: Date() }
  );

  //colocando o evento em eventsData e reescrevendo o arquivo json
  eventsData.push(event);
  fs.writeFile(
    `${__dirname}/../../seeds/events.json`,
    JSON.stringify(eventsData, null, "\t"),
    (err) => {
      res.status(201).json({ //mensagem de retorno
        status: "sucess",
        data: {
          eventData: event,
        },
      });
    }
  );
};

exports.getEventById = (req, res) => {
  
  const id = req.params.id;
  //procurar o evento que coincida o ID
  eventsData.find((events) => {
    if (events.id === id) return res.status(200).json(events);
  });
  //Caso nenhum id tenha sido retornado, envia o status 404 com a mensagem
  return res.status(404).end("ID not found");
};

exports.getEvent = (req, res) => {
  let events = [];
  //Verifica se foi passado algum query param
  if (req.query.dayOfTheWeek) {
    const weekday = req.query["dayOfTheWeek"].toLowerCase();
    eventsData.find((el) => {
      if (el.weekday === weekday) events.push(el);
    });
  } 
  //se não tiver sido passado nenhum query param, retorna todos os events por ser /api/v1/events apenas
  else events = eventsData;

  //Caso tenha algum evento para ser retornado, retorna o array events
  if (events.length > 0) {
    return res.status(200).json(events);
  }

  //caso nenhum evento tenha sido encontrado
  return res.status(404).end("Event not found");
};

exports.deleteEventById = (req, res) => {
  const id = req.params.id;
  const length = eventsData.length;

  //salva apenas os eventos que não têm o id que quer deletar
  eventsData = eventsData.filter(function (el) {
    return el.id !== id;
  });

  //confere se tem algum evento a menos (o deletado)
  if (!(length > eventsData.length))
    return res.status(404).end("Event id not found");

  //reescreve o arquivo json atualizado
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(eventsData, null, "\t"),
    (err) => {
      res.status(201).json({
        status: "sucess",
        event: null,
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
    return res.status(404).end("Event id not found");

  fs.writeFile(
    `${__dirname}/../../seeds/events.json`,
    JSON.stringify(eventsData, null, "\t"),
    (err) => {
      res.status(201).json({
        status: "sucess",
        event: null,
      });
    }
  );
}; 

