import React from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
export default class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      jwt: "",
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      sex: null,
      password: "",
      date: "",
    };
    this.male = this.male.bind(this);
    this.female = this.female.bind(this);

    this.sexCheck = this.sexCheck.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  sexCheck() {
    if (this.state.sex) {
      document.getElementById("male").checked = true;
      document.getElementById("female").checked = false;
    } else {
      document.getElementById("male").checked = false;
      document.getElementById("female").checked = true;
    }
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
        .post("/users/update/" + this.state.id, user, {
          headers: { authorization: this.state.jwt },
        })
        .then((res) => {
          console.log(res.data);
          alert("Your Profile has been changed");
          window.location.replace("/product/all");
        })
        .catch((err) => {
          console.log(err);
          alert("Cannot Change Profile");
        });
    }
  }

  componentDidMount() {
    let jwt = JSON.parse(localStorage.getItem("authen"));
    axios
      .get("/users/check", {
        headers: { authorization: jwt.jwt },
      })
      .then((response) => {
        console.log(response.data.firstname);
        this.setState({
          id: response.data._id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          sex: response.data.sex,
          date: new Date(response.data.datebirth),
          jwt: jwt.jwt,
        });
      })
      .then(() => this.sexCheck())
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="setting">
        <div className="form">
          <h1 style={{ textAlign: "center" }}>Setting</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Firstname:</label>
              <input
                required
                minLength="4"
                type="text"
                className="form-control"
                onChange={this.onChangeFirstname}
                value={this.state.firstname}
              />
            </div>
            <div className="form-group">
              <label>Lastname:</label>
              <input
                required
                minLength="4"
                type="text"
                className="form-control"
                onChange={this.onChangeLastname}
                value={this.state.lastname}
              />
            </div>

            <div className="form-group">
              <label>Birth Date:</label>
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
                value={this.state.date}
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
                type="email"
                className="form-control"
                onChange={this.onChangeEmail}
                value={this.state.email}
                required
              />
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
              id="rePass"
              minLength="8"
              required
              type="password"
              className="form-control"
            />
            <div className="button">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
