const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const connect = mongoose.connect('mongodb+srv://adityasharma0431:anant99@cluster0.5qnfr2m.mongodb.net/users');

connect
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch(() => {
    console.log("Error Connecting Database!");
  });




  const UserSchema = new Schema({
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  
  
  module.exports = mongoose.model("User", UserSchema);
  