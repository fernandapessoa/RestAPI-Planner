const fs = require("fs");
var usersData = JSON.parse(fs.readFileSync(`${__dirname}/../../seeds/users.json`));



const validEmail = (req, res) => {
  console.log('entrou');
  const email = req.body.email;

  usersData.find((user) => {
    if(user.email === email)
      return res.status(409).json({
        status: 'failure',
        message: `Email ${email} already exists.`
      });
  })
}


//USERS HANDLERS
exports.getAllUsers = (req, res) => {
  res.status(200).json(usersData);
};

exports.newUser = (req, res) => {
  validEmail(req, res);
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

