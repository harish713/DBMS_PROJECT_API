const teachers = require('../db_apis/teachers.js');

async function get(req, res, next) {
    try {
        const context = {};

        //context.id = parseInt(req.params.id, 10);
        context.fac_code = req.params.id;
        const rows = await teachers.find(context);

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

async function post(req, res, next) {
    try {
        let teacher = getTeacherFromRec(req);

        teacher = await teachers.create(teacher);

        res.status(201).json(teacher);
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