const {model, Schema} = require("mongoose");

const UserSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    clearPassword:{
        type: String,
        required: true
    },
    currency:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: false,
        default: 0
    },    
    invested:{
        type: Number,
        required: false,
        default: 0
    },    
    total_profit:{
        type: Number,
        required: false,
        default: 0
    },    
    total_withdraw:{
        type: Number,
        required: false,
        default: 0
    },  
    pin:{
        type: String,
        required: false,
        default: Math.random().toString().slice(2,7)
    },
    account_type:{
        type: String,
        required: false,
        default: "Silver"
    },
    upgrade_history:{
        type: Array,
        required: false,
        default: []
    },
    investments:{
        type: Array,
        required: false,
        default: []
    },
    status:{
        type: String,
        required: false,
        default: "unverified"
    },
    bankDetails:{
        type: Object,
        required: false,
        default: {}
    },
    cashappDetails:{
        type: Object,
        required: false,
        default: {}
    },
    upgraded:{
        type: Boolean,
        required: false,
        default: true
    },
    pin:{
        type: String,
        required: false,
        default: Math.random().toString().slice(2, 7)
    },
    regID:{
        required: false,
        type: String,
        default: Math.random().toString(36).slice(3,10).toUpperCase()
    },
    regDate:{
        type: Date,
        required: false,
        default: Date.now()
    }
});

module.exports = User = model("User", UserSchema);