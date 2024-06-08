const mongoose = require('mongoose')

const TournamentSchema = new mongoose.Schema({
    fullName: String,
    teamName: String,
    valoPlayerName:String,
    tagName:String,
    personalId:String,
    phoneNumber:String,
})

const TournamentModel = mongoose.model("Tournament", TournamentSchema)
module.exports = TournamentModel