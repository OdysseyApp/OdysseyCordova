### Install nodemon

`npm install -g nodemon`
<br/>
// On mac or linux<br/>
`sudo npm install -g nodemon`

### Install node-gyp

`npm install node-gyp -g`


### Create db.js file in server/

```
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "11223344",
  database: "bluerose"
});

exports.connection = connection;
```
