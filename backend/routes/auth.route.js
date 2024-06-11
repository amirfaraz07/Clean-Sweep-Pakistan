const express = require('express');
const { signup, login, logOut } = require('../controllers/user.controller');
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logOut)

module.exports = router;