import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: '{Value} is not supported'
        },
        required: true,
    },
    
}, {timestamps: true});

// this is just a away to keep validations at schema level
connectionRequestSchema.pre('save', function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId === connectionRequest.toUserId){
        throw new Error('Cannot send connection request to yourself!')
    }

    next();
});

// Compound Indexing
connectionRequestSchema.index({fromUserId: 1, toUserId: 1}) // 1 for asc order -1 for desc

export const ConnectionRequestModel = mongoose.models.connectionRequestSchema || mongoose.model('ConnectionRequest', connectionRequestSchema);