import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", description: "", category: "", price: "", stock: "" });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://api-food-inventory.onrender.com/products");
            setProducts(response.data.payload.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://api-food-inventory.onrender.com/products");
            setCategories(response.data.payload.categories); // Set categories in state
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api-food-inventory.onrender.com/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = (product) => {
        // Set the product to edit
        setEditingProduct({ ...product });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`https://api-food-inventory.onrender.com/products/${editingProduct.id}`, editingProduct);
            setEditingProduct(null); // Clear the edit form
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleAddProduct = async () => {
        try {
            await axios.post("https://api-food-inventory.onrender.com/products", newProduct);
            setNewProduct({ name: "", description: "", category: "", price: "", stock: "" });
            fetchProducts();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Panel de Administración</h1>
            <div className="add-form">
                <h2>Agregar Producto</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <select
                    className="select-category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Precio"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
                <button className="add-btn" onClick={handleAddProduct}>
                    Agregar
                </button>
            </div>

            {editingProduct && (
                <div className="edit-form">
                    <h2>Editar Producto</h2>
                    <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    />
                    <select
                        className="select-category"
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    />
                    <button onClick={handleSaveEdit}>Guardar</button>
                </div>
            )}

            
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Categoría:</strong> {product.category}</p>
                        <p><strong>Precio:</strong> ${product.price}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <button className="edit-btn" onClick={() => handleEdit(product)}>
                            Editar
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
