const express= require('express')
const app= express();
const cookieParser= require('cookie-parser');
const session = require("express-session");
const bodyParser= require('body-parser');
var cors = require('cors');


var userRoute = require('./routes/users')
var listRoute = require('./routes/lists')
var cardRoute = require('./routes/cards')


require('./connect_db');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:8080","http://192.168.1.5:8080"]
  }));

app.use(session({
    secret: 'secretTest',
    resave: true,
    saveUninitialized: true
}));

app.use('/users', userRoute);
app.use('/lists', listRoute);
app.use('/cards', cardRoute);


app.listen(5000,"0.0.0.0", () => {
    console.log("express server listen to the port 5000")
  })