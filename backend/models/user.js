const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema);

// export model user with UserSchema
module.exports = { User };
