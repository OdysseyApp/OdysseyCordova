## SERVER SETTINGS START

### Install nodemon

`npm install -g nodemon`
<br/>
*On mac or linux*<br/>
`sudo npm install -g nodemon`

### Install node-gyp

`npm install node-gyp -g`


### Create db.js file in server/

```
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "YOUR_HOST",
  user: "YOUR_DB_USER",
  password: "YOUR_PASSWORD",
  database: "YOUR_DB"
});

exports.connection = connection;
```
## SERVER SETTINGS END
