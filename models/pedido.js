import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    pedidoID: {
      type: String,
      required: true,
      unique: true, 
    },
    fechapedido: {
      type: Date,  // Storing as a Date type for easier date manipulation
      required: true,
    },
    // Create a relationship with User
    // userID: {
    //   type: mongoose.Schema.Types.ObjectId,  
    //   required: true,
    //   ref: "User",  // Reference the User model
    // },

    total: {
      type: Number,  // Store as a number for calculations
      required: true,
    },
    estado: {
      type: String,  // Enum type for 'Estado'
      enum: ["Pendiente", "Enviado", "Entregado"],  // Set valid states
      default: "Pendiente",
    },
  },
  {
    timestamps: true,  // Automatically handle createdAt and updatedAt
  }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);

export default Pedido;
