import { useState } from "react";

export default function Inventory({ items, updateItems }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");

  const addItem = () => {
    if (!name || !quantity) return;
    const newItems = [...items, { name, quantity: parseInt(quantity) }];
    updateItems(newItems);
    setName("");
    setQuantity("");
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Item Name"
          className="border p-2 rounded flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 rounded w-24"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          onClick={addItem}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteItem(i)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
