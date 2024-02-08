import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const imageSchema = new Schema({
  public_id: {
    type: String,
  },
  url: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Image = model("Image", imageSchema);

export default Image;