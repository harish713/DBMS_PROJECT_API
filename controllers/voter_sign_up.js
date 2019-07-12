const voter_signup = require('../db_apis/voter_signup')

function getUser(req) {
    const user = {
        username: req.body.USERNAME,
        password: req.body.PASSWORD,
        age: req.body.AGE,
        birth_city: req.body.BIRTH_CITY,
        voter_id: req.body.VOTER_ID
    }
    return user;
}

async function put(req, res, next) {
    try {
        let user = getUser(req);

        user = await voter_signup.create(user);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports.put = put;