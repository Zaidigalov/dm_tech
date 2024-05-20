import React, { useEffect } from "react";
import "../orders/orders.css";
import OrderItem from "./OrderItem";
import { getOrders } from "../../store/ordersSlise";
import { useDispatch } from "react-redux";

export default function OrdersPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div className="orders">
      <OrderItem />
      <OrderItem />
    </div>
  );
}
