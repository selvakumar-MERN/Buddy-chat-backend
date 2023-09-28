const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        message: {
          text: { type: String, required: true },
        },
        users: { type:Array}
        ,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "chatuser",
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

module.exports = mongoose.model("chatmessagese", messageSchema);