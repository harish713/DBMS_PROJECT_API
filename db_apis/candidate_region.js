const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `select status,votes.cand_id,votes.party_id,votes.election_id,name, party_name, n_votes from contestant,candidate,votes,election,party 
    where votes.cand_id = candidate.id and votes.election_id = election.id 
    and votes.party_id = party.party_id and votes.election_id = :election_id
    and votes.region = :region and contestant.id = candidate.id`;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    binds.election_id = context.id;
    binds.region = context.region;
    console.log(binds);
    // if (context.fac_code) {
    //     binds.fac_code = context.fac_code;
    //     query += `\nwhere fac_code = :fac_code`;
    // }

    const result = await database.simpleExecute(query, binds);
    console.log(result.rows)

    return result.rows;
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