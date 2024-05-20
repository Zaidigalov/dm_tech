import React from "react";

export default function OrderItem() {
  return (
    <div className="orders__item">
      <div className="order-item__title-container">
        <p className="order-item__title">Заказ</p>
        <p className="order-item__order-number">№ 32564</p>
      </div>
      <div className="order-item__images"></div>
      <div className="order-item__info">
        <p className="order-item-info__date-title">Оформлено</p>
        <p className="order-item-info__date">1 Января 2023 г</p>
        <p className="order-item-info__sum-title">На сумму</p>
        <p className="order-item-info__sum"> 8 950 ₽</p>
      </div>
    </div>
  );
}
