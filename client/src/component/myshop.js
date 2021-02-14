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
        onClick={() => props.deleteItem(props.item._id, props.item.imgName)}
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

export default class Myshop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      id: null,
      email: null,
      file: null,
      name: null,
      price: null,
      secure_url: null,
    };
    this.upload = this.upload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }
  deleteItem(id, url) {
    axios.delete("/items/" + id).then((res) => console.log(res.data));
    // axios.delete(url).then((res) => console.log(res.data));
    window.location.reload(false);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    const render = new FileReader();
    const output = document.getElementById("output");
    const text = document.getElementById("preview-text");
    render.onload = () => {
      output.src = render.result;
    };
    render.readAsDataURL(e.target.files[0]);
    output.style.display = "block";
    text.style.display = "none";
  }
  addItem() {
    document.querySelector(".popup").classList.add("active");
    document.querySelector("#overlay").style.display = "block";
  }
  removeItem() {
    const output = document.getElementById("output");
    const text = document.getElementById("preview-text");
    document.querySelector(".popup").classList.remove("active");
    document.querySelector("#overlay").style.display = "none";
    this.setState({ file: null });
    document.getElementById("input").value = "";

    output.style.display = "none";
    text.style.display = "block";
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  async upload(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("upload_preset", "mqrxbrao");
    formdata.append("file", this.state.file);
    // formdata.append("api_key", "888914441936656");
    await axios
      .post("https://api.cloudinary.com/v1_1/dm4eyruie/upload", formdata)
      .then((res) => {
        console.log(res.data.secure_url);
        this.setState({ secure_url: res.data.secure_url });
      })
      .catch((err) => console.log("Error: ", err));
    // const formData = new FormData();
    // formData.append("myImage", this.state.file);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // axios
    //   .post("/items/img-add/", formData, config)
    //   .then((response) => {
    //     alert("The file is successfully uploaded");
    //   })
    //   .then(() => {
    //     window.location = "/product/myshop";
    //   })
    //   .catch((error) => {});

    const item = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      email: this.state.email,
      secure_url: this.state.secure_url,
    };
    axios
      .post("/items/add/", item)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  itemList() {
    return this.state.item.map((item) => {
      return <Item item={item} key={item._id} deleteItem={this.deleteItem} />;
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
          email: response.data.email,
        });
      })
      .then(() => console.log(this.state.id))
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/items/" + this.state.id)
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
        <div id="overlay"></div>

        <div className="popup">
          <h2>Add Your Item</h2>
          <span className="time" onClick={this.removeItem}>
            &times;
          </span>

          <div className="picture">
            <img id="output"></img>
            <span id="preview-text">Image Preview</span>
          </div>
          <div className="form-out">
            <div className="forms">
              <form onSubmit={this.upload}>
                <div class="form-group" style={{ paddingTop: "10px" }}>
                  <input
                    id="input"
                    type="file"
                    name="myImage"
                    onChange={this.onChange}
                    className="form-control-file "
                  />
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input
                      maxLength="15"
                      type="text"
                      className="form-control"
                      onChange={this.onChangeName}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Price</label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      onChange={this.onChangePrice}
                    />
                  </div>
                </div>
                <button className="btn btn-success" type="submit">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Add item */}
        <div className="item-list">
          {this.itemList()}
          <div className="add-item">
            <h2 onClick={this.addItem}>ADD ITEM</h2>
          </div>
        </div>
      </div>
    );
  }
}
