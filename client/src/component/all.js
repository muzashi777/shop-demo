import React from "react";
import axios from "axios";

const Item = (props) => (
  <div className="cards">
    <div className="item-list-container">
      <img
        src={props.item.imgName}
        id="output"
        alt="no pic"
        className="card-img-top img-list"
      />
      <div
        className="add-to-cart"
        onClick={() => {
          props.toCart(props.item, props.id);
        }}
      >
        <p>Add To Cart</p>
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

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      item: [],
    };
  }
  async addToCart(value, id) {
    const cart = {
      id: id,
      name: value.name,
      price: value.price,
      email: value.email,
      url: value.imgName,
    };
    await axios
      .post("/carts/add/", cart)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    alert("Item Add!!");
  }

  itemList() {
    return this.state.item.map((item) => {
      return (
        <Item
          item={item}
          key={item._id}
          toCart={this.addToCart}
          id={this.state.id}
        />
      );
    });
  }
  async componentDidMount() {
    let jwt = JSON.parse(localStorage.getItem("authen"));
    await axios
      .get("/users/check", {
        headers: { authorization: jwt.jwt },
      })
      .then((response) => {
        this.setState({
          id: response.data._id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    return <div className="item-list">{this.itemList()}</div>;
  }
}

export default All;
