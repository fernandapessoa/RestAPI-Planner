const fs = require("fs");
var usersData = JSON.parse(fs.readFileSync(`${__dirname}/../../seeds/users.json`));

//Validação dos parâmetros do usuário
exports.validUser = (req, res, next) => {
  let invalidParam = [];
  if(!req.body.firstName)
    invalidParam.push(' firstName');
  if(!req.body.lastName)
    invalidParam.push(' lastName');
  if(!req.body.birthDate)
    invalidParam.push(' birthDate');
  if(!req.body.city)
    invalidParam.push(' city');
  if(!req.body.country)
    invalidParam.push(' country');
  if(!req.body.email)
    invalidParam.push(' email');
  if(!req.body.password)
    invalidParam.push(' password');
  if(!req.body.confirmPassword)
    invalidParam.push(' confirmPassword');

  if(invalidParam.length>0)
    return res.status(400).json({
      status: 'failure',
      message: `Missing fields: ${invalidParam}`
    })

  next();
}

//Validação do email do usuário (evitar email já existente)
exports.validEmail = (req, res, next) => {
  const email = req.body.email;

  usersData.find((user) => {
    if(user.email === email)
      return res.status(409).json({
        status: 'failure',
        message: `Email ${email} already exists.`
      });
  })
  next();
};

//Confirmar se password e confirmPassword são iguais
exports.validPassword = (req,res, next) => {
  if(req.body.password !== req.body.confirmPassword)
    return res.status(401).json({
      status: 'failure',
      message: 'The password confirmation does not match'
    });
    next();
};


//USERS HANDLERS
exports.getAllUsers = (req, res) => {
  res.status(200).json(usersData);
};

exports.newUser = (req, res) => {

  
  //adicionar o objeto em usersData
  const user = Object.assign(req.body);
  usersData.push(user);

  //reescrever o arquivo com o novo objeto
  fs.writeFile(
    `${__dirname}/../../seeds/users.json`,
    JSON.stringify(usersData, null, "\t"),
    (err) => {
      res.status(201).json({
        status: "sucess",
        user,
      });
    }
  );

};

exports.signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //confirmar se existe um usuário com o email e senha passados
  const loggedIn = usersData.find((user) => {
    if (user.email === email && user.password === password) return true;
  });

  //mensagem que deu certo
  if (loggedIn) {
    return res.status(200).json({
      status: 'sucess',
      message: 'Logged User'
    });
  }
  //mensagem de erro
  res.status(404).json({
    status: 'failure',
    message: "Incorrect email or password."
  });
};

