const express = require('express');
const router = new express.Router();
const teachers = require('../controllers/teachers.js');
const user = require('../controllers/user')
const elections = require('../controllers/elections')
const candidate = require('../controllers/candidate')
const candidate_region = require('../controllers/candidate_region')
const login_voter = require('../controllers/login_voter')
const update_votes = require('../controllers/update_votes')
const set_status = require('../controllers/set_status')
const get_candidates = require('../controllers/get_candidates')
const candidate_signup = require('../controllers/candidate_signup')
const voter_signup = require('../controllers/voter_sign_up')
const user_signup = require('../controllers/user_signup')

router.route('/teachers/:id?')
    .get(teachers.get)
    .post(teachers.post)
    .put(teachers.put)
    .delete(teachers.delete);
router.route('/user')
    .post(user.post)

router.route('/user_signup')
    .put(user_signup.put)

router.route('/elections')
    .get(elections.get)
    .post(elections.post)


router.route('/candidate')
    .get(candidate.get)
    .post(candidate_signup.post)

router.route('/candidate-region')
    .put(candidate_region.put)

router.route('/voter_user')
    .post(login_voter.post)
    .put(voter_signup.put)

router.route('/update-votes')
    .put(update_votes.post)

router.route('/set-status')
    .put(set_status.put)

router.route('/get-candidates')
    .get(get_candidates.get)

module.exports = router;