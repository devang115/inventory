import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SupplierForm = ({ supplier, onSubmit }) => {
  const [name, setName] = useState(supplier ? supplier.name : '');
  const [contact, setContact] = useState(supplier ? supplier.contact : '');

  useEffect(() => {
    // Update state if editing a supplier
    if (supplier) {
      setName(supplier.name);
      setContact(supplier.contact);
    }
  }, [supplier]); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSupplier = {
      id: supplier ? supplier.id : Date.now(),
      name,
      contact
    };
    onSubmit(newSupplier);

    setName('');
    setContact('');
  };

  return (
    <div className="dashboard">
      <h2 className="text-xl font-semibold mb-4">
        {supplier ? 'Edit Supplier' : 'Add Supplier'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="supplierName" className="block mb-2">
            Supplier Name:
          </label>
          <input
            type="text"
            id="supplierName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="supplierContact" className="block mb-2">
            Contact Details:
          </label>
          <input
            type="text"
            id="supplierContact"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          {supplier ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </form>
    </div>
  );
};
SupplierForm.propTypes = {
    supplier: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      contact: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired
  };
  
  SupplierForm.defaultProps = {
    supplier: null 
  };
export default SupplierForm;