import React from 'react';
import PropTypes from 'prop-types'; 

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  return (
    <div className="dashboard">
      <h2 className="text-xl font-semibold mb-4">Supplier Management</h2>
      <div id="supplierList">
        {suppliers.map(supplier => (
          <div key={supplier.id} className="mb-4 p-4 border border-gray-300 rounded-md">
            <h3 className="font-semibold text-lg">{supplier.name}</h3>
            <p className="mb-2">Contact: {supplier.contact}</p>
            <button onClick={() => onEdit(supplier.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2">
              Edit
            </button>
            <button onClick={() => onDelete(supplier.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
SupplierList.propTypes = {
    suppliers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        contact: PropTypes.string.isRequired
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };
  
export default SupplierList;