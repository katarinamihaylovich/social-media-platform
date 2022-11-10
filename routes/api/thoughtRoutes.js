const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// api/thoughts -- yes, yes
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId -- yes, yes, yes
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions -- yes
router.route('/:thoughtId/reactions').post(postReaction);

// api/thoughts/:thoughtId/reactions/:reactionId; -- yes
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
