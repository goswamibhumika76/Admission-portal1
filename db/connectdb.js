const mongoose = require('mongoose')
const Local_Url = 'mongodb://127.0.0.1:27017/AdmissionPortal'
const live_url = 'mongodb+srv://bhumikagoswami913:jVPFbhOCghGPwmmg@cluster0.kislj.mongodb.net/Admissionportal?retryWrites=true&w=majority&appName=Cluster0'
const connectDb = () => {
    return mongoose.connect(live_url)
        .then(() => {
            console.log('Connnection Succesful')
        })
        .catch((error) => {
            console.log(error)
        })

}


module.exports = connectDb