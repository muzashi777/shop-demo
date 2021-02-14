import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      sex: null,
      password: "",
      date: new Date(),
    };
    this.male = this.male.bind(this);
    this.female = this.female.bind(this);

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
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

  male() {
    document.getElementById("male").checked = true;
    document.getElementById("female").checked = false;
    this.setState({ sex: true });
  }
  female() {
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = true;
    this.setState({ sex: false });
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.sex === null) {
      alert("Please select your sex!!");
    } else if (
      document.getElementById("pass").value !==
      document.getElementById("rePass").value
    ) {
      alert("Password mismatch!!");
    } else {
      const user = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        sex: this.state.sex,
        date: this.state.date,
        password: this.state.password,
      };

      axios
        .post("/users/adduser", user)
        .then((res) => {
          console.log(res.data);
          alert("Success");
          window.location.replace("/login");
        })
        .catch((err) => {
          console.log(err);
          alert("This Email has been used");
        });
    }
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
            <i className="fas fa-arrow-left" onClick={this.closeNav}></i>
          </div>

          <ul className="list-unstyled components">
            <h3>Welcome</h3>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">SignIn</Link>
            </li>
            <li>
              <Link to="/signup" onClick={this.closeNav}>
                SignUp
              </Link>
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
        <div className="form">
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Firstname:</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onChangeFirstname}
                required
                minLength="4"
              ></input>
            </div>
            <div className="form-group">
              <label>Lastname:</label>
              <input
                required
                minLength="4"
                type="text"
                className="form-control"
                onChange={this.onChangeLastname}
              ></input>
            </div>

            <div className="form-group">
              <label>Birth Date:</label>
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>

            <label style={{ marginRight: "10px", marginBottom: "15px" }}>
              Sex:
            </label>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                onClick={this.male}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                onClick={this.female}
              />
              <label className="form-check-label">Female</label>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                required
                type="email"
                className="form-control"
                onChange={this.onChangeEmail}
              ></input>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                required
                minLength="8"
                type="password"
                onChange={this.onChangePassword}
                className="form-control"
                id="pass"
              />
            </div>

            <label>Re-Password:</label>
            <input
              required
              minLength="8"
              type="password"
              className="form-control"
              id="rePass"
            />
            <div className="buttons">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
