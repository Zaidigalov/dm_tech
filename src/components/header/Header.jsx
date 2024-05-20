import React, { useState } from "react";
import "../header/header.css";
import { NavLink, Link } from "react-router-dom";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";

function setActive({ isActive }) {
  if (isActive)
    return "header__navigation__link header__navigation__link_active";
  else return "header__navigation__link";
}

export default function Header() {
  const cart = useSelector((state) => state.cart.products);
  const [isCartVisible, setIsCartVisible] = useState(false);

  function toggleCartHandler() {
    setIsCartVisible((prev) => !prev);
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="./images/Logo.svg" alt="" />
          </Link>
        </div>
        <nav className="header__navigation">
          <NavLink to="/" className={setActive}>
            Товары
          </NavLink>
          <NavLink to="/orders" className={setActive}>
            Заказы
          </NavLink>
        </nav>
        <button className="header__cart" onClick={toggleCartHandler}>
          <svg>
            <use href="./images/sprite.svg#icon-cart"></use>
          </svg>
          Корзина
          {cart.length !== 0 && <span>({cart.length})</span>}
        </button>
        {isCartVisible && <Cart />}
        {/* <Cart /> */}
      </div>
    </header>
  );
}
