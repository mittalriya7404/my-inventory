import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Inventory from "./Inventory";

export default function Dashboard({ user, setUser }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const updateItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const totalItems = items.length;
  const lowStock = items.filter((item) => item.quantity < 5).length;
  const recent = [...items].slice(-3);

  return (
    <div>
      <Navbar setUser={setUser} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Items</h3>
            <p className="text-2xl">{totalItems}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Low Stock</h3>
            <p className="text-2xl">{lowStock}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Recently Added</h3>
            <ul>
              {recent.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <Inventory items={items} updateItems={updateItems} />
      </div>
    </div>
  );
}
