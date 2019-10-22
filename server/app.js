let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var cors = require("cors");
let Router = require("./Routes");
let db = require("./db");

let mode = "development";
if (mode === "development") {
  const corsConfig = {
    origin: "http://localhost:8080",
    credentials: true
  };
  app.set("CORS_CONFIG", corsConfig);
  app.use(cors(corsConfig));
}

db.connection.connect(err => {
  if (err) {
    console.log("Error connecting to DB" + err);
    return;
  }
  console.log("Connection established");
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello from Express.js"));

app.use("/api/", Router);

app.listen(port, function() {
  console.log("Application Running on " + port);
});
