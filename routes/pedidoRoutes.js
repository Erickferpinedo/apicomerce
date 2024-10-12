import express from "express";
import * as pedidocontroller from "../controllers/pedidocontroller.js";

const router = express.Router();

router.get('/pedido', pedidocontroller.getAll);
router.get('/pedido/:id', pedidocontroller.getById);
router.post('/pedido', pedidocontroller.create);
router.put('/pedido/:id', pedidocontroller.update);
router.delete('/pedido/:id', pedidocontroller.softDelete);

export default router;


