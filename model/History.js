const {model, Schema} = require("mongoose");

const HistorySchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    method:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        default: "pending",
        required: false
    },
    userID:{
        type: String,
        required: true
    },
    user:{
        type: Object,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = History = model("History", HistorySchema);