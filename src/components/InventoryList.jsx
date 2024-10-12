import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InventoryList = ({ items, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [supplierFilter, setSupplierFilter] = useState('');
  
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
    const handleSupplierChange = (e) => setSupplierFilter(e.target.value);
  
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || item.category === categoryFilter) &&
      (supplierFilter === '' || item.supplier === supplierFilter)
    );

  return (
    <div className="dashboard">
      <h2 className="text-xl font-semibold mb-4">Inventory Dashboard</h2>

      <div className="search-filter flex justify-between mb-6">
        <input 
          type="text" 
          placeholder="Search items..." 
          className="px-3 py-2 border border-gray-300 rounded-md w-1/3"
          value={searchTerm} 
          onChange={handleSearchChange}
        />
        <select 
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
        </select>
        <select 
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={supplierFilter}
          onChange={handleSupplierChange}
        >
          <option value="">All Suppliers</option>
          {/* Map your suppliers here */}
        </select>
      </div>

      <table className="inventory-list w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 bg-gray-200">Item Name</th>
            <th className="text-left px-4 py-2 bg-gray-200">Quantity</th>
            <th className="text-left px-4 py-2 bg-gray-200">Category</th>
            <th className="text-left px-4 py-2 bg-gray-200">Supplier</th>
            <th className="text-left px-4 py-2 bg-gray-200">Stock Level</th>
            <th className="text-left px-4 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody >
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td className="px-4 py-2 border border-gray-300">{item.name}</td>
              <td className="px-4 py-2 border border-gray-300">{item.quantity}</td>
              <td className="px-4 py-2 border border-gray-300">{item.category}</td>
              <td className="px-4 py-2 border border-gray-300">{item.supplier}</td>
              <td className="px-4 py-2 border border-gray-300">
                <span className={`stock-level px-2 py-1 rounded-full font-bold ${
                  item.stockLevel === 'low' ? 'bg-red-100 text-red-600' : 
                  item.stockLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                  'bg-green-100 text-green-600'
                }`}>
                  {item.stockLevel}
                </span>
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <button onClick={() => onEdit(item.id)} className="btn btn-primary mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                  Edit
                </button>
                <button onClick={() => onDelete(item.id)} className="btn btn-danger bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
InventoryList.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        supplier: PropTypes.string.isRequired,
        stockLevel: PropTypes.string.isRequired
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };
export default InventoryList;