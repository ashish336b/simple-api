const router = require("express").Router();
const db = require("./dbconnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authguard = require("./middleware/authguard");
/**
 * method : POST
 * url : /register
 */
router.post("/register", async (req, res, next) => {
  try {
    let hashPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    await db.any(
      "INSERT INTO alluser(firstName , lastName , email , pass) VALUES($<firstName> , $<lastName>, $<email> , $<password>);",
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
      }
    );
    res.json({ error: false, message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
  }
});
/**
 * method : POST
 * url : /login
 */
router.post("/login", async (req, res, next) => {
  let data = await db.any(
    "SELECT * FROM alluser WHERE email = $1",
    req.body.email
  );
  if (data.length > 0) {
    let data = data[0];
    if (bcrypt.compareSync(req.body.password, data.pass)) {
      let token = jwt.sign({ data: data }, "asdfjsadkfjaslkfjasfasdfh");
      return res.json({ token: token, error: false });
    } else {
      return res.json({ message: "not authenticated", error: true });
    }
  }
});
/**
 * method : GET
 * url : /getDetails
 */
router.get("/getDetails", authguard, async (req, res, next) => {
  let email = req.authUserData.email;
  let data = await db.one("SELECT * FROM alluser WHERE email = $1", email);
  delete data.pass;
  res.json(data);
});
module.exports = router;
