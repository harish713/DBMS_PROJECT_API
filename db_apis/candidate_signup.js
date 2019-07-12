const oracledb = require('oracledb');
const database = require('../services/database.js');

const createSql =
    `begin insert_candidate(:name, :email, :password, :phone_no, :party_name, :gender, :age, :aadhaar,:election, :region, :res); end;`;

async function create(us) {
    var user = Object.assign({}, us);

    user.res = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
    }
    const result = await database.simpleExecute(createSql, user);
    console.log(user);
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];
    var res = {}
    res.RESULT = result.outBinds.res;
    return res;
}

module.exports.create = create;