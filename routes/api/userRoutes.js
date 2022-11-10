const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// api/users -- yes, yes
router.route('/').get(getUsers).post(createUser);

// api/users/:userId get yes, yes put, delete yes
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// api/users/:userId/friends/:friendId;
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;


// all working!