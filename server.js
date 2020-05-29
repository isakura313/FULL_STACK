const express = require('express');
// const favicon = require('express-favicon');
const path = require('path');
const bodyParser = require("body-parser");



const port = process.env.PORT || 3000;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера

const app = express();
// app.use(favicon(__dirname + '/build/favicon.png'));



// parse requests of content-type - application/json
app.use(bodyParser.json());

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));





// simple route

//обслуживание html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


require("./app/routes/deals.routes.js")(app);



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


















