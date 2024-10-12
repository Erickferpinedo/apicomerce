import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

// Route to get all products
router.get('/product', productController.getAll);

// Route to get a product by ID
router.get('/product/:id', productController.getById);

// Route to create a new product
router.post('/product', productController.create);

// Route to update a product by ID
router.put('/product/:id', productController.update);

// Route to delete (soft delete) a product by ID
router.delete('/product/:id', productController.deleted);

export default router;
