const oracledb = require('oracledb');
const database = require('../services/database.js');
const baseQuery =
    `begin insert_entry_admin(:username, :password,:aadhaar,:check); end;`;

async function create(context) {
    let query = baseQuery;
    const binds = {};
    // if (context.fac_code) {
    //     binds.fac_code = context.fac_code;
    //     query += `\nwhere fac_code = :fac_code`;
    // }
    binds.username = context.username;
    binds.password = context.password;
    binds.aadhaar = context.aadhaar;
    binds.check = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
    }
    console.log(binds);
    const result = await database.simpleExecute(query, binds);
    return result;
}

module.exports.create = create;