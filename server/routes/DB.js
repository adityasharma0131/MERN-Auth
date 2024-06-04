const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connect = mongoose.connect(
  "mongodb+srv://adityasharma0431:anant99@cluster0.5qnfr2m.mongodb.net/users"
);

connect
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch(() => {
    console.log("Error Connecting Database!");
  });

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
