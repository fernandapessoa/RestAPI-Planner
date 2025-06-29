const fs = require('fs');
var eventsData = JSON.parse(
  fs.readFileSync(`${__dirname}/../../seeds/events.json`)
);

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
  //criando um ID para o evento
  if (eventsData.length == 0) newId = '0';
  else newId = (eventsData[eventsData.length - 1].id * 1 + 1).toString();

  //definindo o dia da semana
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
    JSON.stringify(eventsData, null, '\t'),
    (err) => {
      res.status(201).json({
        //mensagem de retorno
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
  //procurar o evento que coincida o ID
  eventsData.find((events) => {
    if (events.id === id) return res.status(200).json(events);
  });
  //Caso nenhum id tenha sido retornado, envia o status 404 com a mensagem
  return res.status(404).json({
    status: 'failure',
    message: `ID ${id} not found`,
  });
};

exports.getEvent = (req, res) => {
  let events = [];
  let query = false;
  let weekday;
  //Verifica se foi passado algum query param
  if (req.query.dayOfTheWeek) {
    query = true;
    weekday = req.query['dayOfTheWeek'].toLowerCase();
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
  //Se não retornou nada mas tinha um query param
  if (query) {
    return res.status(404).json({
      message: `Event on ${weekday} not found`,
    });
  }
  //caso nenhum evento tenha sido encontrado
  return res.status(404).json({
    message: 'No event registered',
  });
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
    return res.status(404).json({
      status: 'failure',
      message: `Event id ${id} not found`,
    });

  //reescreve o arquivo json atualizado
  fs.writeFile(
    `${__dirname}/../data/events.json`,
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

  //salva apenas os eventos que o dia da semana não corresponde ao que quer deletar
  eventsData = eventsData.filter(function (el) {
    return el.weekday !== weekday;
  });

  //confere se há elemento a menos
  if (!(length > eventsData.length))
    return res.status(404).json({
      status: 'failure',
      message: `Event on ${weekday} not found`,
    });

  //reescreve o arquivo sem o evento com o weekday passado
  fs.writeFile(
    `${__dirname}/../../seeds/events.json`,
    JSON.stringify(eventsData, null, '\t'),
    (err) => {
      res.status(202).json({
        status: 'sucess',
        event: null,
      });
    }
  );
};
