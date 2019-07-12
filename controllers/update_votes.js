const teachers = require('../db_apis/teachers.js');
const elections = require('../db_apis/elections')
const candidate_region = require('../db_apis/candidate_region')
const update_votes = require('../db_apis/update_votes')

async function get(req, res, next) {
    try {
        const context = {};
        context.id = req.body.id;
        context.region = req.body.region;
        console.log(context)
        const rows = await candidate_region.find(context);

        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;

function getTeacherFromRec(req) {
    const teacher = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        fac_code: req.body.fac_code,
        designation: req.body.designation,
        dept: req.body.dept
    };

    return teacher;
}

function getUser(req) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        residence: req.body.residence,
        party: req.body.party
    }
    return user;
}

function getElection(req) {
    const election = {
        type: req.body.TYPE,
        no_of_const: req.body.NO_OF_CONST,
        date: req.body.DATES,
        eligibility: req.body.ELIGIBILITY
    }
    return election;
}

function getVoterData(req) {
    const c = {
        CANDIDATE_ID: req.body.CAND_ID,
        ELEC_ID: req.body.ELEC_ID,
        PARTY_ID: req.body.PARTY_ID,
        BIRTH_PLACE: req.body.BIRTH_PLACE,
        USERNAME: req.body.USERNAME
    }
    return c
}
async function post(req, res, next) {
    try {
        var context = {};
        context = getVoterData(req)
        console.log(context)
        const rows = await update_votes.find(context);

        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

async function put(req, res, next) {
    try {
        const context = {};
        context = getVoterData(req)
        console.log(context)
        const rows = await update_votes.find(context);

        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.put = put;

async function del(req, res, next) {
    try {
        //const id = parseInt(req.params.id, 10);
        const fac_code = req.query.fac_code;
        console.log(fac_code);
        const success = await teachers.delete(fac_code);

        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.delete = del;