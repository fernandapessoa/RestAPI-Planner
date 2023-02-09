const fs = require("fs");
var usersData = JSON.parse(fs.readFileSync(`${__dirname}/../../seeds/users.json`));

//USERS HANDLERS
exports.getAllUsers = (req, res) => {
  res.status(200).json(usersData);
};

exports.newUser = (req, res) => {
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
    return res.status(200).send("Logged User");
  }
  res.status(404).send("Incorrect user name or password.");
};

