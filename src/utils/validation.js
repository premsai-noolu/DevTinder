const validator = require("validator");
const validation = (req) => {
  const { firstName, lastName, emailId, passWord } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid one");
  }
  if (!validator.isStrongPassword(passWord)) {
    throw new Error("password is not strong");
  }
};

module.exports = { validation };
