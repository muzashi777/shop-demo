import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
      jwt: null,
      email: null,
      password: null,
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openNav() {
    document.querySelector(".sidebar").classList.add("active");
    document.querySelector("#overlay").style.display = "block";
  }
  closeNav() {
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector("#overlay").style.display = "none";
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/users/login", user)
      .then((res) => this.setState({ jwt: res.data, login: true }))
      .then(() => {
        localStorage.setItem(
          "authen",
          JSON.stringify({
            login: true,
            jwt: this.state.jwt,
          })
        );
        window.location = "/product/all";
      })
      .catch((err) => {
        console.log(err);
        alert("Email or Password is Wrong");
      });
  }

  linkToLogin() {
    alert("Please Login");

    window.location = "/login";
  }
  render() {
    return (
      <div>
        {/* sidebar */}
        <nav className="sidebar">
          <div id="dismiss">
            <i class="fas fa-arrow-left" onClick={this.closeNav}></i>
          </div>

          <ul className="list-unstyled components">
            <h3>Welcome</h3>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login" onClick={this.closeNav}>
                SignIn
              </Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </nav>
        <div id="overlay"></div>

        {/* Content */}
        <div id="navbar">
          <i className="fas fa-align-left" onClick={this.openNav}></i>
          <h1>Bike Shop</h1>
          <ion-icon name="cart-outline" onClick={this.linkToLogin}></ion-icon>
        </div>
        <div>
          <div className="form">
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={this.onChangeEmail}
                ></input>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={this.onChangePassword}
                ></input>
              </div>
              <div className="buttons">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <div style={{ textAlign: "right" }}>
              <Link to="/signup">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
