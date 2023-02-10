const fs = require("fs");
var usersData = JSON.parse(fs.readFileSync(`${__dirname}/../../seeds/users.json`));

//Validação dos parâmetros do usuário
const validUser = (req, res) => {
  let invalidParam = [];
  if(!req.body.firstName)
    invalidParam.push('firstName');
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
    return res.status(422).json({
      status: 'failure',
      message: `Missing fields: ${invalidParam}`
    })
}

//Validação do email do usuário (evitar email já existente)
const validEmail = (req, res) => {
  const email = req.body.email;

  usersData.find((user) => {
    if(user.email === email)
      return res.status(409).json({
        status: 'failure',
        message: `Email ${email} already exists.`
      });
  })
};

//Confirmar se password e confirmPassword são iguais
const validPassword = (req,res) => {
  if(!(req.body.password === req.body.confirmPassword))
    return res.status(401).json({
      status: 'failure',
      message: 'The password confirmation does not match'
    });
};


//USERS HANDLERS
exports.getAllUsers = (req, res) => {
  res.status(200).json(usersData);
};

exports.newUser = (req, res) => {
  validUser(req, res);
  validEmail(req, res);
  validPassword(req, res); 
  
  const user = Object.assign(req.body);

  usersData.push(user);
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
  console.log("Registrado");
};

exports.signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loggedIn = usersData.find((user) => {
    if (user.email === email && user.password === password) return true;
  });

  if (loggedIn) {
    return res.status(200).json({
      status: 'sucess',
      message: 'Logged User'
    });
  }
  res.status(404).json({
    status: 'failure',
    message: "Incorrect email or password."
  });
};

