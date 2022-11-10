const { User, Thought } = require('../models');
const reactionSchema = require('../models/Reaction');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions')
            .then(async (thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID.'})
                    : res.json({
                        thought
                    })
                )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId},
            { $set: req.body},
            {runValidators: true, new: true})
            .then((thought) => 
                !thought
                    ?res
                        .status(404)
                        .json({ message: 'No thought found with that ID.'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'Thought does not exist.'})
                    : reactionSchema.findOneAndUpdate(
                        {thoughts: req.params.thoughtId},
                        { $pull: {thoughts: req.params.thoughtId} },
                        {new: true}
                    ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    postReaction(req, res)  {
        console.log('React to this thought!');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {$addToSet: {reactions: req.body} },
            {runValidators: true, new: true}
        )
        .then((thought) => 
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID.'})
                : res.json(thought))
        .catch((err) => res.status(500).json(err));        
    },
    deleteReaction(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {$in: req.params.reactionId}}},
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
            ? res 
                .status(404)
                .json({ message: 'No thought found with that ID.'})
            : res.json(thought))
        .catch((err) => res.status(500).json(err));
    }
}