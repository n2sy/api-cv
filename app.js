const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const cvRoutes = require('./routes/cv');
const authRoutes = require('./routes/auth');
const app = express();

//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded
app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
//app.use(feedRoutes);
app.use('/cv', cvRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log("-----", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message : message, data : data }); //data c'est pour la validation
});

mongoose.connect('mongodb://localhost:27017/projectIsie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(result => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(err));

