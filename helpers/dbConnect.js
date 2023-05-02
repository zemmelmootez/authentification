
const mongoose=require('mongoose')
require('dotenv').config()
const connect = () => {
    mongoose.connect(process.env.MONGOOSEURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))
}

module.exports=connect