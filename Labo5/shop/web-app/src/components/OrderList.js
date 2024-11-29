import React, { useEffect, useState } from "react";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/api";
import { Order } from "shared/models/order";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ userName: "", productIds: [] });
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      const orderList = response.data.map(
        (order) =>
          new Order(
            order.id,
            order.User ? order.User.name : "Unknown User",
            order.Products ? order.Products.map((product) => product.name) : []
          )
      );
      setOrders(orderList);
      setError(null);
    } catch (error) {
      setError("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder(newOrder);
      setNewOrder({ userName: "", productIds: [] });
      fetchOrders();
      setError(null);
    } catch (error) {
      setError("Failed to create order");
      console.error("Error creating order:", error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await updateOrder(editingOrder.id, editingOrder);
      setEditingOrder(null);
      fetchOrders();
      setError(null);
    } catch (error) {
      setError("Failed to update order");
      console.error("Error updating order:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
      setError(null);
    } catch (error) {
      setError("Failed to delete order");
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - User: {order.userId} - Products:{" "}
            {order.products ? order.products.join(", ") : ""}
            <button onClick={() => setEditingOrder(order)}>Edit</button>
            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingOrder ? "Edit Order" : "Create Order"}</h3>
      <input
        type="text"
        placeholder="User Name"
        value={editingOrder ? editingOrder.userName : newOrder.userName}
        onChange={(e) => {
          const userName = e.target.value;
          if (editingOrder) {
            setEditingOrder({ ...editingOrder, userName });
          } else {
            setNewOrder({ ...newOrder, userName });
          }
        }}
      />
      <input
        type="text"
        placeholder="Product Names (comma separated)"
        value={
          editingOrder
            ? editingOrder.productIds
              ? editingOrder.productIds.join(", ")
              : ""
            : newOrder.productIds.join(", ")
        }
        onChange={(e) => {
          const productIds = e.target.value
            .split(",")
            .map((name) => name.trim());
          if (editingOrder) {
            setEditingOrder({ ...editingOrder, productIds });
          } else {
            setNewOrder({ ...newOrder, productIds });
          }
        }}
      />
      <button onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}>
        {editingOrder ? "Update Order" : "Create Order"}
      </button>
    </div>
  );
};

export default OrderList;
