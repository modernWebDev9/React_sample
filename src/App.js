import React, { useEffect, useState } from "react";
import "./App.css"; // We’ll define some styles here

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status">Loading items...</p>;
  if (error) return <p className="status error">Error: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="title">Items List</h1>
      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <h2 className="card-title">{item.title}</h2>
            <p className="card-body">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;