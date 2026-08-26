import { useState } from "react";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 35000,
      stock: 10,
    },
    {
      id: 2,
      name: "Keyboard",
      category: "Accessories",
      price: 1200,
      stock: 25,
    },
    {
      id: 3,
      name: "Mouse",
      category: "Accessories",
      price: 800,
      stock: 30,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.stock) {
      alert("Please complete all fields.");
      return;
    }

    if (editingId) {
      // UPDATE
      setProducts(
        products.map((product) =>
          product.id === editingId
            ? {
                ...product,
                name: form.name,
                category: form.category,
                price: Number(form.price),
                stock: Number(form.stock),
              }
            : product
        )
      );

      setEditingId(null);
    } else {
      // CREATE
      const newProduct = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      setProducts([...products, newProduct]);
    }

    // Clear form
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  // EDIT
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });

    setEditingId(product.id);
  };

  // DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setEditingId(null);

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  // SEARCH
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your products and inventory</p>
        </div>

        <div className="product-count">
          <strong>{products.length}</strong>
          <span>Total Products</span>
        </div>
      </div>

      {/* CRUD Form */}
      <div className="product-card">
        <div className="card-title">
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Enter stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="product-card">
        <div className="table-header">
          <div>
            <h2>Product List</h2>
            <p>View and manage all products</p>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>

                    <td>
                      <strong>{product.name}</strong>
                    </td>

                    <td>
                      <span className="category-badge">
                        {product.category}
                      </span>
                    </td>

                    <td>₱{product.price.toLocaleString()}</td>

                    <td>
                      <span
                        className={
                          product.stock <= 5
                            ? "stock-low"
                            : "stock-good"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-products">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;