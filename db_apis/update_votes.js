const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `begin vote_cand(:CANDIDATE_ID, :ELEC_ID, :PARTY_ID, :BIRTH_PLACE, :USERNAME, :RESULT); end;`;

async function find(context) {
    let query = baseQuery;
    const binds = Object.assign({}, context);
    binds.RESULT = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
    }
    console.log(binds);
    // if (context.fac_code) {
    //     binds.fac_code = context.fac_code;
    //     query += `\nwhere fac_code = :fac_code`;
    // }

    const result = await database.simpleExecute(query, binds);
    console.log(result.outBinds)

    return result.outBinds;
}

module.exports.find = find;

const query = `begin insert_election(:type , :no_of_const , :date , :eligibility , :res); end;`

async function create(ele) {
    var election = Object.assign({}, ele);

    election.res = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
    }

    const result = database.simpleExecute(query, election);
    result.type = election.type
    result.no_of_const = election.no_of_const
    result.date = election.date
    result.eligibility = election.eligibility
    console.log('After create')
    console.log(result);
    //result.res = result.outBinds.res;
    //delete result.outBinds;
    return result;
}

module.exports.create = create;