import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productID: {
      type: String,
      required: true,
      unique: true, 
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
   // categoryID: {
    //  type: mongoose.Schema.Types.ObjectId, //  Reference to the Category model
     // ref: "Category", //  Assuming a "Category" model exists
      // required: true,
    },
  //},
  {
    timestamps: true, 
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
