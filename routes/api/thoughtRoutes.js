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

// api/thoughts -- yes
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId -- yes, no, no
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions -- no
router.route('/:thoughtId/reactions').post(postReaction);

// api/thoughts/:thoughtId/reactions/:reactionId;
router.route(':thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
