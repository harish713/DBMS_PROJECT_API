const candidate_signup = require('../db_apis/candidate_signup')

function getUser(req) {
    const user = {
        name: req.body.NAME,
        email: req.body.EMAIL,
        password: req.body.PASSWORD,
        phone_no: req.body.PHONE_NO,
        party_name: req.body.PARTY_NAME,
        gender: req.body.GENDER,
        age: req.body.AGE,
        aadhaar: req.body.AADHAAR,
        election: req.body.ELECTION,
        region: req.body.REGION
    }
    return user;
}

async function post(req, res, next) {
    try {
        let user = getUser(req);
        console.log(user);
        user = await candidate_signup.create(user);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;