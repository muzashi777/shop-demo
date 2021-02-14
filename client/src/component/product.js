import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Item = (props) => (
  <div className="cards" style={{ width: "14rem" }}>
    <div className="item-list-container">
      <img
        src={props.item.imgName}
        id="output"
        alt="no pic"
        className="card-img-top img-list"
      />
      <div className="add-to-cart">
        <p onClick={props.toLogin}>Add To Cart</p>
      </div>
    </div>
    <div className="card">
      <div className="card-header">
        <h5 style={{ textAlign: "center" }}>{props.item.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Price: ${props.item.price}</li>
        <li className="list-group-item">Email: {props.item.email}</li>
      </ul>
    </div>
  </div>
);

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      item: [],
    };
  }

  linkToLogin() {
    alert("Please Login");

    window.location = "/login";
  }

  openNav() {
    document.querySelector(".sidebar").classList.add("active");
    document.querySelector("#overlay").style.display = "block";
  }
  closeNav() {
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector("#overlay").style.display = "none";
  }
  itemList() {
    return this.state.item.map((item) => {
      return <Item item={item} key={item._id} toLogin={this.linkToLogin} />;
    });
  }

  componentDidMount() {
    axios
      .get("/items")
      .then((response) => {
        this.setState({
          item: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
              <Link to="/" onClick={this.closeNav}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/login">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>
        <div id="overlay"></div>

        {/* Content */}
        <div id="navbar">
          <i class="fas fa-align-left" onClick={this.openNav}></i>
          <h1>Bike Shop</h1>
          <ion-icon name="cart-outline" onClick={this.linkToLogin}></ion-icon>
        </div>
        <div className="item-list">{this.itemList()}</div>
      </div>
    );
  }
}

export default Product;
