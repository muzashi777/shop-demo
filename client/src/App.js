import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ProtectedRoute } from "./component/protected.route";
import { Protected } from "./component/protected";
import "./component/css/style.css";

import Login from "./component/login";
import SignUp from "./component/sigup";
import Product from "./component/product";
import Cart from "./component/cart";
import Products from "./component/products";
import Myshop from "./component/myshop";
import Setting from "./component/setting";
import All from "./component/all";
import Footer from "./component/footer";

function App() {
  return (
    <Router>
      <Protected path="/" exact component={Product} />
      <Protected path="/login" component={Login} />
      <Protected path="/signup" component={SignUp} />
      <ProtectedRoute path="/product" component={Products} />
      <Route path="/product/all" component={All} />
      <Route path="/product/cart" component={Cart} />
      <Route path="/product/myshop" component={Myshop} />
      <Route path="/product/setting" component={Setting} />
      <Footer />
    </Router>
  );
}

export default App;
