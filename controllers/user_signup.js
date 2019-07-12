const user_signup = require('../db_apis/user_signup.js');


async function put(req, res, next) {
    try {
        const context = {};
        console.log(req.body);
        context.id = parseInt(req.params.id, 10);
        var jsonObject = req.body;
        console.log(jsonObject)
        context.username = jsonObject.USERNAME;
        context.password = jsonObject.password;
        context.aadhaar = jsonObject.AADHAAR;
        var rows = await user_signup.create(context);
        rows.USERNAME = jsonObject.USERNAME;
        rows.PASSWORD = jsonObject.PASSWORD;
        rows.RESULT = rows.outBinds.check;
        console.log(rows);
        delete rows.outBinds
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