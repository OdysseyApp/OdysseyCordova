let router = require("express").Router();
let db = require("../db");
let re = require("../components/response");
let api_key = require("../components/constants").API_KEY;
let GLOBALS = require("../components/constants");
var moment = require("moment");

router.post("/login", async (req, res) => {
  try {
    let data = req.body;
    let usernameRes = data.username;
    let passwordRes = data.password;

    db.connection.query(
      "select * from users where email = ?",
      [usernameRes, usernameRes],
      (err, data) => {
        if (err) return re.error(res);
        else {
          if (data.length <= 0) {
            return re.noresult(res);
          } else {
            let tokenData = { user_id: data[0].id };
            let password = data[0].password;
            if (password === passwordRes) {
              let responseData = {
                status: 1,
                message: "User Found",
                token: GLOBALS.generateToken(tokenData, GLOBALS.JWT_SECRET)
              };
              return re.response(responseData, res);
            } else {
              let responseData = {
                status: 0,
                message: "Invalid Password"
              };
              return re.response(responseData, res);
            }
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    return re.error(res);
  }
});

router.get("/session", (req, res) => {
  if (req.headers.token) {
    let token = req.headers.token;
    try {
      var tokenData = GLOBALS.verifyToken(token);
      if (!tokenData) return re.notoken(res);
      else {
        let responseData = {
          status: 1,
          message: "Session Valid",
          email: tokenData.email
        };
        return re.response(responseData, res);
      }
    } catch (err) {
      return re.error(res);
    }
  } else return re.error(res);
});

module.exports = router;
