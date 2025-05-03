import mongoose from "mongoose";
import { dbName } from "../constants";

export const connection = async(): Promise<void> =>{
    try {
        const connected = await mongoose.connect(`${process.env.DB_URI}/${dbName}`);
        console.log(`Database connected successfully: ${connected.connection.name} ${connected.connection.name}`)
    } catch (error) {
        console.log('Error while connecting to database', error);
        process.exit(1);
    }
}