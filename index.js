const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const UserModel = require('./models/User')

const app = express()
app.use(express.json())

app.use(cors())

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11) may not support 204
  };
  

  app.use(cors(corsOptions));

  

mongoose.connect("mongodb://localhost:27017/user")


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

app.listen(3001, () => {
    console.log("server is running")
})