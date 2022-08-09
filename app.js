const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cvRoutes = require('./routes/cv');
const authRoutes = require('./routes/auth');
const avatarRoutes = require('./routes/avatar');




const app = express();

app.use("/avatars", express.static("uploads"));
//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded
app.use(express.json()); //application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

//app.use(feedRoutes);

app.use('/api/upload', avatarRoutes);
app.use('/auth', authRoutes);
app.use('/cv', cvRoutes);


app.use((error, req, res, next) => {
  console.log("-----", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data }); //data c'est pour la validation
});

mongoose.connect("mongodb://localhost:27017/projectIsie", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(result => app.listen(process.env.PORT))
  .catch(err => console.log(err));


