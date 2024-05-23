import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderItem({ order, orderNumber }) {
  //console.log("props", order);
  /* order.forEach(item => {
    console.log(item)
  }); */
  return (
    <div className="orders__item">
      <div className="order-item__title-container">
        <p className="order-item__title">Заказ</p>
        <p className="order-item__order-number">№ {orderNumber}</p>
      </div>
      <div className="order-item__images">
        {order.map((item) => {
          return (
            <img
              key={item.product.id}
              src={item.product.picture}
              alt={item.product.title}
              className="order-item__image"
            />
          );
        })}
      </div>
      <div className="order-item__info">
        <p className="order-item-info__date-title">Оформлено</p>
        <p className="order-item-info__date">1 Января 2023 г</p>
        <p className="order-item-info__sum-title">На сумму</p>
        <p className="order-item-info__sum">
          {order.reduce((sum, item) => {
            return sum + item.product.price;
          }, 0)}{" "}
          ₽
        </p>
      </div>
    </div>
  );
}
