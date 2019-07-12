const user = require('../db_apis/user.js');
const login_voter = require('../db_apis/login_voter')
async function post(req, res, next) {
    try {
        const context = {};
        console.log(req.body);
        context.id = parseInt(req.params.id, 10);
        var jsonObject = req.body;
        console.log(jsonObject)
        context.username = jsonObject.USERNAME;
        context.password = jsonObject.PASSWORD;
        var rows = await login_voter.find(context);
        rows.USERNAME = jsonObject.USERNAME;
        rows.PASSWORD = jsonObject.PASSWORD;
        rows.RESULT = rows.outBinds.check;
        rows.REGION = rows.outBinds.region;
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

module.exports.post = post;