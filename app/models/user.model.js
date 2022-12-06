const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username : String,
        shopName:String,
        email: String,
        password: String,
        image:{
            type: String,
            default: "https://i.postimg.cc/sXQ14Hf4/no-image.webp"
        },
        phone:{
            type: String,
            required:true,
            default: 0
        },
        address:{
            type:String,
            required: false,
            default:"",
        },
       
        roles:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]

    })

)

module.exports = User