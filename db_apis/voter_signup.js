const oracledb = require('oracledb');
const database = require('../services/database.js');

const createSql =
    `begin insert_voter_entry(:username, :password, :age, :birth_city, :voter_id, :res); end;`;

async function create(us) {
    const user = Object.assign({}, us);

    user.res = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
    }
    const result = await database.simpleExecute(createSql, user);
    console.log(user);
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];
    var finalRes = {}
    finalRes.RESULT = result.outBinds.res;
    return finalRes;
}

module.exports.create = create;