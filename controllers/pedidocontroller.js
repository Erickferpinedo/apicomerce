import Pedido from "../models/pedido.js";

// Obtener todos los pedidos
export const getAll = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ deletedAt: null });
    return res.json(pedidos);
  } catch (error) {
    console.error("Error al recuperar los pedidos:", error);
    return res.status(500).json({ message: "Error al recuperar los pedidos" });
  }
};

// Obtener pedido por ID
export const getById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    
    if (!pedido || pedido.deletedAt) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.json(pedido);
  } catch (error) {
    console.error("Error al recuperar el pedido:", error);
    return res.status(500).json({ message: "Error al recuperar el pedido" });
  }
};

// Crear un nuevo pedido
export const create = async (req, res) => {
  try {
    const { pedidoID, fechapedido, total, estado } = req.body;

    // Validar los campos requeridos
    if (!pedidoID || !fechapedido || !total || !estado) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newPedido = await Pedido.create({
      pedidoID,
      fechapedido,
      total,
      estado,
    });

    console.log("Pedido creado exitosamente");
    return res.status(201).json({ message: "Pedido creado exitosamente", pedido: newPedido });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un pedido por ID
export const update = async (req, res) => {
  try {
    const pedidoToUpdate = await Pedido.findById(req.params.id);

    // Verificar si el pedido existe y no está marcado como eliminado
    if (!pedidoToUpdate || pedidoToUpdate.deletedAt) {
      return res.status(404).json({ message: "Pedido no encontrado o ya eliminado" });
    }

    const { pedidoID, fechapedido, total, estado } = req.body;

    // Si el nuevo pedidoID es diferente del actual, verificar que no esté duplicado
    if (pedidoID && pedidoID !== pedidoToUpdate.pedidoID) {
      const existingPedido = await Pedido.findOne({ pedidoID });
      if (existingPedido) {
        return res.status(409).json({ message: "El nuevo pedidoID ya está en uso" });
      }
    }

    // Actualizar los campos del pedido solo si están presentes en el body
    pedidoToUpdate.set({
      pedidoID: pedidoID || pedidoToUpdate.pedidoID,
      fechapedido: fechapedido || pedidoToUpdate.fechapedido,
      total: total || pedidoToUpdate.total,
      estado: estado || pedidoToUpdate.estado,
    });

    // Guardar los cambios en la base de datos
    await pedidoToUpdate.save();

    return res.json({ message: "Pedido actualizado exitosamente", pedido: pedidoToUpdate });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminación suave de un pedido
export const softDelete = async (req, res) => {
  try {
    const pedidoToDelete = await Pedido.findById(req.params.id);

    if (!pedidoToDelete || pedidoToDelete.deletedAt) {
      return res.status(404).json({ message: "Pedido no encontrado o ya eliminado" });
    }

    pedidoToDelete.deletedAt = Date.now();
    await pedidoToDelete.save();

    return res.json({ message: "Pedido eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
