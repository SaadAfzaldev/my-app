import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number;
};

const connection: connectionObject = {};

export default async function dbConnect() {
    if (connection.isConnected) {
        console.log('Already connected to DB');
        return;
    }

    try {

        const db = await mongoose.connect(process.env.MONGODB_URI as string, {});

        connection.isConnected  = db.connections[0].readyState

        console.log('Connected to DB');


    }
    catch (err) {

        console.log("Database connection error");
        
        console.log(err);

        process.exit(1);
    }
}