const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const UserModel = require('./models/User')
const TournamentModel = require("./models/Tournament")

const app = express()
app.use(express.json())

app.use(cors())

const corsOptions = {
    origin: ['http://localhost:5173', 'https://igame.live'],
    optionsSuccessStatus: 200
  };
  

  app.use(cors(corsOptions));

  

mongoose.connect("mongodb+srv://test:test@cluster0.jxib0sn.mongodb.net/user")


app.post('/login', (req, res) =>{
   const {email,password} = req.body;
   UserModel.findOne({email: email})
   .then(user => {
    if(user){
        if(user.password === password)
            res.json("Success")
        else{
            res.json("password is incorrect")
        }
    }
    else{
        res.json("User does not exist")
    }
   })
})
app.post('/register', (req, res) =>{
    UserModel.create(req.body)
    .then(user=> res.json(user))
    .catch(err=>res.json(err))
})

app.post('/tournament/create', (req, res) =>{
    TournamentModel.create(req.body)
    .then(tournament=> res.json(tournament))
    .catch(err=>res.json(err))
})

app.get('/tournament', (req, res) => {
    TournamentModel.find()
      .then(tournaments => res.json(tournaments))
      .catch(err => res.status(500).json({ error: 'Internal server error' }));
  });
  

app.listen(3001, () => {
    console.log("server is running")
})