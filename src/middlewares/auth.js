const adminAuth = (req, res, next) => {
  const token = "xyz";
  const authorizedtoken = token === "xyz";
  if (!authorizedtoken) {
    res.send("got all data of the users");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyzabc";
  const authorizedtoken = token === "xyz";
  if (authorizedtoken) {
    res.send("user logged in successfulyy");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
