const express = require('express');
const { addUsers } = require('../controllers/users.controllers');

const router = express.Router();

router.post('/users', addUsers);
module.exports = router;
