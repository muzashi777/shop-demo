import React from "react";
import axios from "axios";
import "./css/myShop.css";

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
        onClick={() => props.deleteItem(props.item._id)}
      >
        <p style={{ color: "red" }}>Delete</p>
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

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      id: null,
      email: null,
      file: null,
      name: null,
      price: null,
    };
  }
  async deleteItem(id) {
    await axios.delete("/carts/" + id).then((res) => console.log(res.data));
    window.location.reload(false);
  }

  itemList() {
    if (this.state.item.length !== 0) {
      return this.state.item.map((item) => {
        return <Item item={item} key={item._id} deleteItem={this.deleteItem} />;
      });
    } else {
      return (
        <div className="empty-cart">
          <p>EMPTY CART</p>
        </div>
      );
    }
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
          email: response.data.email,
        });
      })
      .then(() => console.log(this.state.id))
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/carts/" + this.state.id)
      .then((response) => {
        this.setState({
          item: response.data,
        });
      })
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {/* Add item */}
        <div className="item-list">{this.itemList()}</div>
      </div>
    );
  }
}
