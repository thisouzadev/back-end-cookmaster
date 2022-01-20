const express = require('express');
const { addUsers } = require('../controllers/users.controllers');
const { login } = require('../controllers/login.controllers');

const router = express.Router();

router.post('/users', addUsers);
router.post('/login', login);

module.exports = router;
