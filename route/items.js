const router = require("express").Router();
const Item = require("../models/item.model");
const multer = require("multer");
const path = require("path");

let img = null;
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    img = "IMAGE-" + Date.now() + path.extname(file.originalname);
    cb(null, img);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

router.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/img-add", async (req, res) => {
  upload(req, res, (err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); //Here you get file.
    /*Now do where ever you want to do*/
    if (!err) return res.send(200).end();
  });
});

router.get("/:id", (req, res) => {
  Item.find({ userId: req.params.id })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", async (req, res) => {
  try {
    const userId = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const price = Number(req.body.price);
    const imgName = req.body.secure_url;

    const newItem = new Item({
      userId,
      name,
      email,
      price,
      imgName,
    });

    newItem
      .save()
      .then(() => res.json("Item added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    res.status(500).send();
  }
});

router.delete("/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.post("/update/:id", requireJWTAuth, (req, res) => {
//   console.log("update");
//   Item.findById(req.params.id)
//     .then(async (user) => {
//       user.firstname = req.body.firstname;
//       user.lastname = req.body.lastname;
//       user.email = req.body.email;
//       user.datebirth = Date.parse(req.body.date);
//       user.sex = Boolean(req.body.sex);
//       user.password = await bcrypt.hash(req.body.password, 10);

//       user
//         .save()
//         .then(() => res.json("User updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
