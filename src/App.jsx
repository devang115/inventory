import React, { useState, useEffect } from 'react';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import SupplierForm from './components/SupplierForm';
import SupplierList from './components/SupplierList';

// Define loadFromLocalStorage outside the component
const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// Define saveToLocalStorage outside the component
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

function App() {
  const [inventoryItems, setInventoryItems] = useState(
    loadFromLocalStorage('inventoryItems') || [
      { id: 1, name: 'Laptop', quantity: 50, category: 'electronics', supplier: 'TechCorp', stockLevel: 'high' },
      { id: 2, name: 'T-Shirt', quantity: 100, category: 'clothing', supplier: 'FashionInc', stockLevel: 'medium' },
      { id: 3, name: 'Apples', quantity: 5, category: 'food', supplier: 'FreshFoods', stockLevel: 'low' }
    ]
  );

  const [suppliers, setSuppliers] = useState(
    loadFromLocalStorage('suppliers') || [
      { id: 1, name: 'TechCorp', contact: 'tech@corp.com' },
      { id: 2, name: 'FashionInc', contact: 'fashion@inc.com' },
      { id: 3, name: 'FreshFoods', contact: 'fresh@foods.com' }
    ]
  );

  const [editingItem, setEditingItem] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    saveToLocalStorage('inventoryItems', inventoryItems);
    saveToLocalStorage('suppliers', suppliers);
  }, [inventoryItems, suppliers]);

  const handleAddItem = (newItem) => {
    setInventoryItems(prevItems =>
      prevItems.some(item => item.id === newItem.id)
        ? prevItems.map(item => (item.id === newItem.id ? newItem : item))
        : [...prevItems, newItem]
    );
  };

  const handleDeleteItem = (itemId) => {
    setInventoryItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleEditItem = (itemId) => {
    setEditingItem(inventoryItems.find(item => item.id === itemId));
  };

  const handleAddSupplier = (newSupplier) => {
    setSuppliers(prevSuppliers =>
      prevSuppliers.some(s => s.id === newSupplier.id)
        ? prevSuppliers.map(s => (s.id === newSupplier.id ? newSupplier : s))
        : [...prevSuppliers, newSupplier]
    );
  };

  const handleDeleteSupplier = (supplierId) => {
    setSuppliers(prevSuppliers =>
      prevSuppliers.filter(s => s.id !== supplierId)
    );
  };

  const handleEditSupplier = (supplierId) => {
    setEditingSupplier(suppliers.find(s => s.id === supplierId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Inventory Management System
      </h1>

      <InventoryForm
        item={editingItem}
        suppliers={suppliers}
        onSubmit={handleAddItem}
      />
      <InventoryList
        items={inventoryItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      <SupplierForm
        supplier={editingSupplier}
        onSubmit={handleAddSupplier}
      />
      <SupplierList
        suppliers={suppliers}
        onEdit={handleEditSupplier}
        onDelete={handleDeleteSupplier}
      />
    </div>
  );
}

export default App;