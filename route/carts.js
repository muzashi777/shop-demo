const router = require("express").Router();
const Cart = require("../models/cart.model");

router.get("/", (req, res) => {
  res.json("This is Cart Collection");

  //   Item.find()
  //     .then((items) => res.json(items))
  //     .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Cart.find({ userId: req.params.id })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const userId = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const price = Number(req.body.price);
  const imgName = req.body.url;

  const newCart = new Cart({
    userId,
    name,
    email,
    price,
    imgName,
  });

  newCart
    .save()
    .then(() => res.json("Cart addes!!"))
    .catch((err) => res.status(400).json("Error: ") + err);
});

router.delete("/:id", (req, res) => {
  Cart.findByIdAndDelete(req.params.id)
    .then(() => res.json("Cart deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
