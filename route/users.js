const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const SECRET = "my_secret_key";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRET,
};
let userInfo = "";
const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  let check = false;
  await User.find().then((user) => {
    for (let i = 0; i < user.length; i++) {
      if (user[i]["email"] === payload.sub) {
        check = true;
        userInfo = user[i];
        return check, userInfo;
      }
    }
  });
  if (check) {
    done(null, true);
  } else {
    done(null, false);
  }
});

const passport = require("passport");
passport.use(jwtAuth);
const requireJWTAuth = passport.authenticate("jwt", { session: false });

router.get("/", requireJWTAuth, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/check", requireJWTAuth, (req, res) => {
  res.send(userInfo);
});

router.post("/login", async (req, res) => {
  try {
    let id = "";
    let check = false;
    let password = "";
    const email = req.body.email;
    await User.find().then((user) => {
      for (let i = 0; i < user.length; i++) {
        if (user[i]["email"] === email) {
          password = user[i]["password"];
          check = true;
          id = user[i]["_id"];
          return password, check, id;
        }
      }
    });
    if (check !== true) {
      return res.status(404).send("Cannot find user");
    } else {
      if (await bcrypt.compare(req.body.password, password)) {
        const payload = {
          sub: email,
          iat: new Date().getTime(),
        };
        res.send(jwt.encode(payload, SECRET));
      } else {
        res.send("Not Allowed");
      }
    }
  } catch {
    res.status(500).send();
  }
});

router.post("/adduser", async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const datebirth = Date.parse(req.body.date);
    const sex = Boolean(req.body.sex);
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      datebirth,
      sex,
      password,
    });

    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch {
    res.status(500).send();
  }
});

// router.route("/:id").delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json("User deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.post("/update/:id", requireJWTAuth, (req, res) => {
  User.findById(req.params.id)
    .then(async (user) => {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.datebirth = Date.parse(req.body.date);
      user.sex = Boolean(req.body.sex);
      user.password = await bcrypt.hash(req.body.password, 10);
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
