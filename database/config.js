const mongoose = require('mongoose');

const dbConnection = async() => {


    try {
        await mongoose.connect(
            process.env.MONGODB_CNN
        );
    } catch (error){
        console.log(error);
        throw new Error('Database Error on initialization')
    }

    console.log('Database connected');

}


module.exports = {
    dbConnection
}

