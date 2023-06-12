const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createOrDeleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:usertId/friends/:friendId
router.route('/:userId/friends/:friendId').post(createOrDeleteFriend).delete(createOrDeleteFriend);


module.exports = router;
