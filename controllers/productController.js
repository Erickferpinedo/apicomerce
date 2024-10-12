import Product from "../models/product.js";

// Get all products
 export const getAll = async (req, res) => {
  try {
    const products = await Product.find({ deletedAt: null }); // 'products' instead of 'product'
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving products" });
  }
}

// Get product by ID
export const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product || product.deletedAt) { // Ensure the product exists and is not deleted
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving product" });
  }
}

// Create a new product
 export const create = async (req, res) => {
  try {
    const { productID, name, description, price, stock, categoryID } = req.body;

    const newProduct = await Product.create({
      productID,
      name,
      description,
      price,
      stock,
      categoryID
    });
    
    console.log("product succesfully created ");

    return res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update a product by ID
 export const update = async (req, res) => {
  try {
    const productToUpdate = await Product.findById(req.params.id);

    if (!productToUpdate || productToUpdate.deletedAt) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { productID, name, description, price, stock, categoryID } = req.body;

    // Use Object.assign to update fields in one step
    Object.assign(productToUpdate, {
      productID: productID || productToUpdate.productID,
      name: name || productToUpdate.name,
      description: description || productToUpdate.description,
      price: price || productToUpdate.price,
      stock: stock || productToUpdate.stock,
      categoryID: categoryID || productToUpdate.categoryID
    });

    await productToUpdate.save();

    return res.json({ message: "Product updated successfully", product: productToUpdate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Soft delete a product
 export const deleted = async (req, res ) => {
  try {
    const productToDelete = await Product.findById(req.params.id);

    if (!productToDelete || productToDelete.deletedAt) {
      return res.status(404).json({ message: "Product not found or already deleted" });
    }

    productToDelete.deletedAt = Date.now();
    await productToDelete.save();

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}







