const express = require('express');
const { updateUser, deleteUser, getUserByID} = require('../controllers/user.controller');
const { requireSignIn, isAuth} = require('../utils/authentication');
const { isAdmin } = require('../utils/authorization');

const router = express.Router();

router.put('/:adminID/users/:userID', requireSignIn , isAdmin, isAuth, updateUser);
router.delete('/:adminID/users/:userID', requireSignIn , isAuth, isAdmin, deleteUser);

router.param('adminID', getUserByID);

module.exports = router;