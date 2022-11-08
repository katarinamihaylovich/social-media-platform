const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postReaction);

// api/thoughts/:thoughtId/reactions/:reactionId;
router.route(':thoughtId/reactions/:reactionId').delete(deleteReaction);

