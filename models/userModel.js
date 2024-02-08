import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have atleast 8 chars"],
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  uploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
  ]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;