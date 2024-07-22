const router = require("express").Router();
var ironSession = require("iron-session/express").ironSession;

var session = ironSession({
  password: "complex_password_at_least_32_characters_long",
  cookieName: "express-with-auth-cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
});

const AuthController = require("../controllers/auth.controller");

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

// Authenticatino Routes
router.get("/users", session, AuthController.users);
router.post("/login", session, AuthController.login);
router.post("/register", session, AuthController.register);

module.exports = router;
