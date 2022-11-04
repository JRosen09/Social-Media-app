//will run on every request that requires a user to be authenticated
//to run. If they don’t pass this middleware, then they won’t be able
//to make the request.
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get("Authorization");
    //if headerToken is not valid, consolelog error
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;

    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    next();
  },
};
