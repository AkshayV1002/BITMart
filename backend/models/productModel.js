import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    photo:{
        data: Buffer,
        contentType : String,
    }

  },
  { timestamps: true }
);


const product = mongoose.model('Product', productSchema)
export default product