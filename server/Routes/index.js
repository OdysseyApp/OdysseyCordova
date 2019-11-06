let router = require("express").Router();
let db = require("../db");
let re = require("../components/response");
let api_key = require("../components/constants").API_KEY;
let GLOBALS = require("../components/constants");
var moment = require("moment");

router.post("/checkin/add", async (req, res) => {
  try {
    let requestData = req.body;
    let timestamp = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    let row = {
      status: requestData.status,
      user_id: requestData.user_id,
      location: requestData.location,
      latitude: requestData.latitude,
      longitude: requestData.longitude,
      flag_name: requestData.flag_name,
      timestamp: timestamp
    };
    db.connection.beginTransaction(function(err) {
      db.connection.query("insert into checkins set ?", row, (err, data) => {
        if (err) {
          db.connection.rollback();
          re.error(res);
        } else {
          db.connection.commit(err => {
            if (err) {
              db.connection.rollback();
              re.error(res);
            } else {
              let responseData = {
                status: 1,
                message: "Checkin Created",
                data: data
              };
              return re.response(responseData, res);
            }
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
    return re.error(res);
  }
});

router.get("/checkin/list/:id", async (req, res) => {
  let user_id = req.params.id;

  try {
    db.connection.query(
      "select * from checkins where user_id = ?",
      [user_id],
      (err, data) => {
        if (err) return re.error(res);
        else {
          let responseData = {
            status: 1,
            message: "Checkins List",
            data: data
          };

          return re.response(responseData, res);
        }
      }
    );
  } catch (err) {
    // console.log(err);
    return await re.error(res);
  }
});

router.post("/register", async (req, res) => {
  try {
    let requestData = req.body;
    let timestamp = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    let row = {
      name: requestData.name,
      email: requestData.email,
      password: requestData.password,
      country: requestData.country,
      timestamp: timestamp
    };
    db.connection.beginTransaction(function(err) {
      db.connection.query(
        "select * from users where email = ?",
        [requestData.email],
        (err, data) => {
          if (!data[0]) {
            db.connection.query("insert into users set ?", row, (err, data) => {
              if (err) {
                db.connection.rollback();
                re.error(res);
              } else {
                db.connection.commit(err => {
                  if (err) {
                    db.connection.rollback();
                    re.error(res);
                  } else {
                    let tokenData = {
                      user_id: data.insertId
                    };
                    let responseData = {
                      status: 1,
                      message: "User Created",
                      token: GLOBALS.generateToken(
                        tokenData,
                        GLOBALS.JWT_SECRET
                      )
                    };
                    return re.response(responseData, res);
                  }
                });
              }
            });
          } else {
            let responseData = {
              status: 2,
              message: "Email already exists. Please try a different one."
            };
            return re.response(responseData, res);
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
    return re.error(res);
  }
});

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
