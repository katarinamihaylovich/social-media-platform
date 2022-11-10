const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    getUsers(req, res) {
        User.find()
            .populate()
            .select('-__v')
            .then(async (users) => {
                const userObj = {
                    users
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            // .populate('thoughts')
            // .populate('friends')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, 
            { $set: req.body},
            { runValidators: true, new: true})
            .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID.' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId})
            .then(res.json({message: 'User has been deleted.'}))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        console.log('You are adding a friend.');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: {friends: req.params.friendId} },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID.'})
                : res.json(user)
                )
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId }},
        )
        .then((user) => 
            !user
                ? res 
                    .status(404)
                    .json({ message: 'No user found with that ID.'})
                : res.json({message: 'Friend has been deleted'})
        )
        .catch((err) => res.status(500).json(err));
    }
};

