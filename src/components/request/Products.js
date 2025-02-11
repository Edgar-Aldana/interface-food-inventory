import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const categoryStyles = {
  1: { name: 'Bebidas', color: '#ffcccb' }, 
  2: { name: 'Comida Rápida', color: '#ffeb99' }, 
  3: { name: 'Postres', color: '#c3e6cb' }, 
  4: { name: 'Snacks', color: '#d1c4e9' }, 
  5: { name: 'Lácteos', color: '#b3e5fc' }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api-food-inventory.onrender.com/products');
        if (response.data.success) {
          setProducts(response.data.payload.products);
        }
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) => ({
      ...prevSelected,
      [id]: (prevSelected[id] || 0) + 1,
    }));
  };

  const handleRequest = async () => {
    try {
      const requestBody = Object.keys(selectedProducts).map((id) => ({
        product_id: parseInt(id),
        quantity: selectedProducts[id],
      }));

      const response = await axios.post('https://api-food-inventory.onrender.com/products/request', {
        products: requestBody,
      });

      if (response.data.success) {
        alert('Solicitud realizada con éxito');
        setSelectedProducts({});
      } else {
        alert('Error en la solicitud');
      }
    } catch (error) {
      alert('Hubo un error al procesar la solicitud');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Solicitud de Alimentos</h2>
      <div className="categories-grid">
        {Object.keys(categoryStyles).map((categoryId) => {
          const filteredProducts = products.filter(p => p.category_id === parseInt(categoryId));
          if (filteredProducts.length === 0) return null;

          return (
            <div key={categoryId} className="category-section" style={{ backgroundColor: categoryStyles[categoryId].color }}>
              <h3>{categoryStyles[categoryId].name}</h3>
              <div className="grid-container">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="grid-item">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p><strong>Precio:</strong> ${product.price} USD</p>
                    <button onClick={() => handleSelectProduct(product.id)}>
                      Agregar
                    </button>
                    <p>Seleccionados: {selectedProducts[product.id] || 0}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button className="request-button" onClick={handleRequest} disabled={Object.keys(selectedProducts).length === 0}>
        Solicitar
      </button>
    </div>
  );
};

export default Products;
