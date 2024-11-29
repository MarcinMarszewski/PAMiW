import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import { Product } from "shared/models/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      const productList = response.data.map(
        (product) => new Product(product.id, product.name, product.price)
      );
      setProducts(productList);
      setError(null);
    } catch (error) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct);
      setNewProduct({ name: "", price: "" });
      fetchProducts();
      setError(null);
    } catch (error) {
      setError("Failed to create product");
      console.error("Error creating product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      fetchProducts();
      setError(null);
    } catch (error) {
      setError("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
      setError(null);
    } catch (error) {
      setError("Failed to delete product");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>{editingProduct ? "Edit Product" : "Create Product"}</h3>
      <input
        type="text"
        placeholder="Name"
        value={editingProduct ? editingProduct.name : newProduct.name}
        onChange={(e) => {
          const name = e.target.value;
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, name });
          } else {
            setNewProduct({ ...newProduct, name });
          }
        }}
      />
      <input
        type="text"
        placeholder="Price"
        value={editingProduct ? editingProduct.price : newProduct.price}
        onChange={(e) => {
          const price = e.target.value;
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, price });
          } else {
            setNewProduct({ ...newProduct, price });
          }
        }}
      />
      <button
        onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
      >
        {editingProduct ? "Update Product" : "Create Product"}
      </button>
    </div>
  );
};

export default ProductList;
