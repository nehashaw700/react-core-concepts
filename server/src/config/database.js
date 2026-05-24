
import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    try {
        console.log("++++");
        await mongoose.connect(
            'mongodb+srv://nehashaw700:Seema%40123@backend-db.qtdmrgn.mongodb.net/USER_DB'
        )
        console.log("DB connected");
    } catch (err) {
        console.log("Error:", err);
    }
}

