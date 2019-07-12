const teachers = require('../db_apis/teachers.js');
const candidate = require('../db_apis/candidate');
const get_candidates = require('../db_apis/get_candidates')

async function get(req, res, next) {
    try {
        const context = {};

        //context.id = parseInt(req.params.id, 10);
        // context.name = req.body.name
        // context.party = req.body.party
        // context.votes = req.body.votes
        const rows = await get_candidates.find(context);

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

async function post(req, res, next) {
    try {
        let user = getUser(req);

        user = await teachers.create(user);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

async function put(req, res, next) {
    try {
        let teacher = getTeacherFromRec(req);

        //employee.employee_id = parseInt(req.params.id, 10);

        teacher = await teachers.update(teacher);
        console.log(teacher);
        if (teacher !== null) {
            res.status(200).json(teacher);
        } else {
            res.status(404).end();
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