const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `begin login(:username, :password,:check, :region); end;`;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    // if (context.fac_code) {
    //     binds.fac_code = context.fac_code;
    //     query += `\nwhere fac_code = :fac_code`;
    // }
    binds.username = context.username;
    binds.password = context.password;

    binds.check = {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT
        }
        //console.log(binds);
    binds.region = {
        type: oracledb.STRING,
        dir: oracledb.BIND_OUT
    }
    const result = await database.simpleExecute(query, binds);
    return result;
}

module.exports.find = find;