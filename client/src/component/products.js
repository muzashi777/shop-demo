import React from "react";
import { Link } from "react-router-dom";

export default class Products extends React.Component {
  openNav() {
    document.querySelector(".sidebar").classList.add("active");
    document.querySelector("#overlay").style.display = "block";
  }
  closeNav() {
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector("#overlay").style.display = "none";
  }
  logOut() {
    localStorage.removeItem("authen");
  }

  render() {
    return (
      <div>
        {/* sidebar */}
        <nav className="sidebar">
          <div id="dismiss">
            <i className="fas fa-arrow-left" onClick={this.closeNav}></i>
          </div>
          <ul className="list-unstyled components">
            <h3>Welcome</h3>
            <li>
              <Link to="/product/all" onClick={this.closeNav}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/product/cart" onClick={this.closeNav}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/product/myshop" onClick={this.closeNav}>
                My Shop
              </Link>
            </li>
            <li>
              <Link to="/product/setting" onClick={this.closeNav}>
                Setting
              </Link>
            </li>
            <li>
              <a href="#" onClick={this.logOut}>
                Sign Out
              </a>
            </li>
          </ul>
        </nav>
        <div id="overlay"></div>

        {/* Content */}
        <div id="navbar">
          <i className="fas fa-align-left" onClick={this.openNav}></i>
          <h1>Bike Shop</h1>
          <Link to="/product/cart" onClick={this.closeNav} className="cart">
            <ion-icon name="cart-outline"></ion-icon>
          </Link>
        </div>
      </div>
    );
  }
}
