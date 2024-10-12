import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 

const InventoryForm = ({ item, suppliers, onSubmit }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [quantity, setQuantity] = useState(item ? item.quantity : '');
  const [category, setCategory] = useState(item ? item.category : 'electronics');
  const [supplier, setSupplier] = useState(item ? item.supplier : '');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setCategory(item.category);
      setSupplier(item.supplier);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: item ? item.id : Date.now(),
      name,
      quantity: parseInt(quantity),
      category,
      supplier,
      stockLevel: getStockLevel(quantity)
    };
    onSubmit(newItem);
    setName('');
    setQuantity('');
    setCategory('electronics');
    setSupplier('');
  };

  const getStockLevel = (quantity) => {
    return quantity <= 10 ? 'low' : quantity <= 50 ? 'medium' : 'high';
  };

  return (
    <div className="dashboard">
      <h2 className="text-xl font-semibold mb-4">
        {item ? 'Edit Inventory Item' : 'Add Inventory Item'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="itemName" className="block mb-2">
            Item Name:
          </label>
          <input
            type="text"
            id="itemName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="itemQuantity" className="block mb-2">
            Quantity:
          </label>
          <input
            type="number"
            id="itemQuantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="itemCategory" className="block mb-2">
            Category:
          </label>
          <select
            id="itemCategory"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="itemSupplier" className="block mb-2">
            Supplier:
          </label>
          <select
            id="itemSupplier"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          {item ? 'Update Item' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};
InventoryForm.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number, 
      name: PropTypes.string,
      quantity: PropTypes.number,
      category: PropTypes.string,
      supplier: PropTypes.string,
      stockLevel: PropTypes.string
    }),
    suppliers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        contact: PropTypes.string
      })
    ),
    onSubmit: PropTypes.func.isRequired 
  };
  
  InventoryForm.defaultProps = {
    item: null // Assuming item can be null when adding a new item
  };
  
export default InventoryForm;